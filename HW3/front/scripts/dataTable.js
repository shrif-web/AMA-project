function fillTable() {
    var objects = readFile()
    var table = document.getElementById("main-table-body")

    objects.forEach(element => {
        var tr = document.createElement('tr');
        tr.innerHTML = `<td>${element.ranking}</td>
        <td>${element.name}</td>
        <td>${element.from}</td>
        <td>${element.score}</td>`;
        table.append(tr);
    });
}

function fillCards() {
    var objects = readFile()
    var cardContainer = document.getElementById("card-container")

    objects.forEach(element => {
        var card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
        <div class="card-body font-weight-bold">
            <div class="d-flex justify-content-between  font-weight-light">
                <p class="card-text">رتبه</p>
                <p class="card-text card-data">${element.ranking}</p>
            </div>
            <div class="d-flex justify-content-between">
                <p class="card-text">نام تیم</p>
                <p class="card-text card-data">${element.name}</p>
            </div>
            <div class="d-flex justify-content-between font-weight-light">
                <p class="card-text">نام دانشگاه و کشور</p>
                <p class="card-text card-data">${element.from}</p>
            </div>
            <div class="d-flex justify-content-between">
                <p class="card-text">امتیاز</p>
                <p class="card-text card-data">${element.score}</p>
            </div>
        </div>`;
        cardContainer.insertBefore(card, cardContainer.lastElementChild)
    });
}

function readFile() {
    var request = new XMLHttpRequest();
    request.open("GET", "../assets/table-data.json", false);
    request.send(null)
    var my_JSON_object = JSON.parse(request.responseText);
    return my_JSON_object
}

function getPosts() {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:4000/api/post/';
    xhr.responseType = 'json';
    xhr.open('GET', url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    var my_JSON_object = JSON.parse(xhr.response);
    return my_JSON_object;
}

function fillTable2() {
    var objects = getPosts()
    var table = document.getElementById("main-table-body")

    objects.forEach(element => {
        var tr = document.createElement('tr');
        tr.innerHTML = `<td>${element.ranking}</td>
        <td>${element.title}</td>
        <td>${element.content}</td>
        <td>${element.id}</td>`;
        table.append(tr);
    });
}

function fillCards() {
    var objects = readFile()
    var cardContainer = document.getElementById("card-container")

    objects.forEach(element => {
        var card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
        <div class="card-body font-weight-bold">
            <div class="d-flex justify-content-between  font-weight-light">
                <p class="card-text">عنوان</p>
                <p class="card-text card-data">${element.title}</p>
            </div>
            <div class="d-flex justify-content-between">
                <p class="card-text">محتوا</p>
                <p class="card-text card-data">${element.content}</p>
            </div>
            <div class="d-flex justify-content-between font-weight-light">
                <p class="card-text">نام دانشگاه و کشور</p>
                <p class="card-text card-data">${element.from}</p>
            </div>
            <div class="d-flex justify-content-between">
                <p class="card-text">شناسه</p>
                <p class="card-text card-data">${element.id}</p>
            </div>
        </div>`;
        cardContainer.insertBefore(card, cardContainer.lastElementChild)
    });
}