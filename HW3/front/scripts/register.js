function changeToSignUpForm() {
    document.getElementById("signup").classList.add("active")
    document.getElementById("signin").classList.remove("active")
    document.getElementById("signup-btn").classList.add("active")
    document.getElementById("signin-btn").classList.remove("active")
    document.getElementById("main-pic-img-tag").style.height = "350px";
    document.getElementById("main-pic-paragraph").classList.remove("invisible")
    document.title = "ثبت‌نام"
}

function changeToSignInForm() {
    document.getElementById("signin").classList.add("active")
    document.getElementById("signup").classList.remove("active")
    document.getElementById("signin-btn").classList.add("active")
    document.getElementById("signup-btn").classList.remove("active")
    document.getElementById("main-pic-img-tag").style.height = "400px";
    document.getElementById("main-pic-paragraph").classList.add("invisible")
    document.title = "ورود"
}


function validateRegister() {
    let email = document.getElementById("registerEmail").value
    let pass1 = document.getElementById("registerPassword1").value
    let pass2 = document.getElementById("registerPassword2").value
    let checkBox = document.getElementById("registerCheck").checked

    error = document.getElementById("registerError")
    let hasError = false
    if (!email) {
        error.innerHTML = `<p class="bg-danger">${'ایمیل را وارد کنید.'}</p > `;
        hasError = true
    }

    if (!pass1 && !hasError) {
        error.innerHTML = `<p class="bg-danger"> ${'رمز عبور را وارد کنید.'}</p > `;
        hasError = true;
    }

    if (!pass2 && !hasError) {
        error.innerHTML = `<p class="bg-danger"> ${'تکرار رمز عبور را وارد کنید.'}</p > `;
        hasError = true;
    }

    if (!hasError && pass1 != pass2) {
        error.innerHTML = `<p class="bg-danger"> ${'رمز عبور و تکرار آن همخوانی ندارند.'}</p > `;
        hasError = true;
    }

    if (!checkBox && !hasError) {
        error.innerHTML = `<p class="bg-danger"> ${'‌برای ثبت‌نام باید قوانین و شرایط را بپذیرید.'}</p > `;

        hasError = true;
    }

    if (hasError) {
        error.classList.remove("invisible");
        setTimeout(() => {
            error.classList.add("invisible");
            hasError = false;
            error.innerHTML = "<p></p>"
        }, 3000);
        return;
    }

    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:4000/api/signup';
    xhr.responseType = 'json';
    let params = `email=${email}&password=${pass1}`;
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 201) {
            error.innerHTML = `<p class="bg-success"> ${xhr.response.message}</p > `;
        }
        else {
            error.innerHTML = `<p class="bg-danger"> ${xhr.response.message}</p > `;
        }

        hasError = true;
        error.classList.remove("invisible");
        setTimeout(() => {
            error.classList.add("invisible");
            hasError = false;
            error.innerHTML = "<p></p>"
        }, 3000);
    }
    xhr.send(params);
}

function validateSignIn() {
    let email = document.getElementById("signInEmail").value
    let pass = document.getElementById("signInPassword").value
    error = document.getElementById("signInError")
    let hasError = false

    if (!email) {
        error.innerHTML = `<p class="bg-danger">${'ایمیل را وارد کنید.'}</p >`;
        hasError = true
    }

    if (!pass && !hasError) {
        error.innerHTML = `<p class="bg-danger"> ${'رمز عبور را وارد کنید.'}</p >`;
        hasError = true;
    }

    if (hasError) {
        error.classList.remove("invisible");
        setTimeout(() => {
            error.classList.add("invisible");
            hasError = false;
            error.innerHTML = "<p></p>"
        }, 3000);
    }

    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:4000/api/signin';
    xhr.responseType = 'json';
    let params = `email=${email}&password=${pass}`;
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let token = xhr.response.token;
                window.sessionStorage.setItem("Token", token);
                window.localStorage.setItem("Token", token);
                console.log(token);
                setTimeout(function () {
                    document.location.href = "http://localhost:4000/dashboard";
                    window.sessionStorage.setItem("Token", token);
                    window.localStorage.setItem("Token", token);
                }, 1)
            }
            else {
                error.innerHTML = `<p class="bg-danger"> ${xhr.response?.message}</p > `;
                hasError = true;
                error.classList.remove("invisible");
                setTimeout(() => {
                    error.classList.add("invisible");
                    hasError = false;
                    error.innerHTML = "<p></p>"
                }, 3000);
            }
        }
    }
    xhr.send(params);

}