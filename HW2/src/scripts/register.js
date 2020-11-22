function changeToSignUpForm() {
    document.getElementById("signup").classList.add("active")
    document.getElementById("signin").classList.remove("active")
    document.getElementById("signup-btn").classList.add("active")
    document.getElementById("signin-btn").classList.remove("active")
    document.title = "ثبت‌نام"
}

function changeToSignInForm() {
    document.getElementById("signin").classList.add("active")
    document.getElementById("signup").classList.remove("active")
    document.getElementById("signin-btn").classList.add("active")
    document.getElementById("signup-btn").classList.remove("active")
    document.title = "ورود"
}