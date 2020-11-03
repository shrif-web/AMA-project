package main

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"strings"
)

type writeResponse struct {
	LineNumber int
	Line       string
}

type shaResponse struct {
	Hash string
}

func main() {
	http.HandleFunc("/go/sha", sha)
	http.HandleFunc("/go/write", write)
	http.ListenAndServe(":8000", nil)
}

func sha(w http.ResponseWriter, req *http.Request) {
	if req.Method != "POST" {
		fmt.Fprintf(w, "Sorry, only POST methods are supported for this path.")
		return
	}
	if err := req.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}
	number1, err1 := strconv.Atoi(req.FormValue("number1"))
	number2, err2 := strconv.Atoi(req.FormValue("number2"))

	if err1 != nil || err2 != nil {
		fmt.Fprintf(w, "inputs must be number")
		return
	}

	h := sha256.New()
	h.Write([]byte(strconv.Itoa(number1 + number2)))
	w.Header().Set("Content-Type", "application/json")
	objectResponse := &shaResponse{
		Hash: hex.EncodeToString(h.Sum(nil)),
	}
	jsonResponse, _ := json.Marshal(objectResponse)
	fmt.Fprintf(w, string(jsonResponse))
}

func write(w http.ResponseWriter, req *http.Request) {
	if !isValidRequest(w, req) {
		return
	}
	lineNumber, error := strconv.Atoi(req.FormValue("lineNumber"))

	if error != nil || lineNumber < 1 || lineNumber > 100 {
		fmt.Fprintf(w, "lineNumber must be a number between 1 and 100")
		return
	}
	line := readLine(lineNumber - 1)
	objectResponse := &writeResponse{
		Line:       line,
		LineNumber: lineNumber}
	jsonResponse, _ := json.Marshal(objectResponse)
	fmt.Fprintf(w, string(jsonResponse))
}

func isValidRequest(w http.ResponseWriter, req *http.Request) bool {
	if req.Method != "GET" {
		fmt.Fprintf(w, "Sorry, only GET methods are supported for this path.")
		return false
	}
	return true
}

func readLine(lineNumber int) string {
	data, err := ioutil.ReadFile("../files/example.txt")
	if err != nil {
		fmt.Println("File reading error", err)
		return "File reading error"
	}

	return strings.Split(string(data), "\n")[lineNumber]
}

func writeToFile() {
	f, _ := os.Create("../files/example.txt")

	for i := 1; i <= 100; i++ {
		f.WriteString(strconv.Itoa(i) + "\n")
	}

	f.Sync()
}
