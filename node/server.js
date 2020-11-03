const express = require('express')
const app = express()
const port = 9000
app.use(express.urlencoded());
app.use(express.json());
var crypto = require('crypto');
const lineReader = require('line-reader');

app.post('/node/sha', (req, res) => {
    var num1 = req.body.number1;
    var num2 = req.body.number2;
    if (num1 == undefined || num2 == undefined || num1 == '' || num2 == '' || Number.isNaN(num1) || Number.isNaN(num2)) {
        res.status(400).send("inputs must be number");
    }
    var seed = (parseInt(num1) + parseInt(num2)).toString();
    console.log(seed)
    var hash = crypto.createHash('sha256').update(seed).digest('hex');
    res.status(200).json({ Hash: hash })
})

app.get('/node/write', (req, res) => {
    var lineNumber = req.query.lineNumber;

    if (lineNumber == undefined || lineNumber == '' || Number.isNaN(lineNumber)) {
        res.status(400).send("input must be number");
    }

    if (parseInt(lineNumber) < 1 || parseInt(lineNumber) > 100) {
        res.status(400).send("lineNumber must be a number between 1 and 100");
    }

    var counter = 1
    lineReader.eachLine('../files/example.txt', function (line) {
        if (counter == parseInt(lineNumber)) {
            res.status(200).send({ Line: line, LineNumber: lineNumber })
            return false;
        }
        counter++;
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
