function readPost() {
    console.log("readposte with get");
    let postId = document.getElementById("postId").value;
    const url = 'http://localhost:4000/api/admin/post/crud/';

    if (postId) {
        url += postId;
    }

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 201) {
            error.innerHTML = `<p class="bg-success"> ${xhr.response.message}</p > `;
        }
    }
    xhr.send();
}

function removePost() {
    console.log("remove post with delete");
    let postId = document.getElementById("postId").value;

    if (!postId) {
        return;
    }

    const xhr = new XMLHttpRequest();
    const url = `http://localhost:4000/api/admin/post/crud/${postId}`;
    xhr.responseType = 'json';
    xhr.open('DELETE', url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 201) {
            error.innerHTML = `<p class="bg-success"> ${xhr.response.message}</p > `;
        }
    }
    xhr.send();
}

function createWithPost() {
    console.log("create post with post");
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;

    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:4000/api/admin/post/crud';
    let params = `title=${title}&content=${content}`;
    xhr.responseType = 'json';
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 201) {
            error.innerHTML = `<p class="bg-success"> ${xhr.response.message}</p > `;
        }
    }
    xhr.send(params);
}

function createWithPut() {
    console.log("create post with put");
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;

    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:4000/api/admin/post/crud';
    let params = `title=${title}&content=${content}`;
    xhr.responseType = 'json';
    xhr.open('PUT', url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 201) {
            error.innerHTML = `<p class="bg-success"> ${xhr.response.message}</p > `;
        }
    }
    xhr.send(oarams);
}