const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);

function validateEmail() {
    const email = emailInput.value;
    if (email === "") {
        emailError.textContent = "Email is required";
    } else if (!isValidEmail(email)) {
        emailError.textContent = "Invalid email";
    } else {
        emailError.textContent = "";
    }
}

function validatePassword() {
    const password = passwordInput.value;
    if (password === "") {
        passwordError.textContent = "Password is required";
    } else if (password.length < 6) {
        passwordError.textContent = "Password should be at least 6 characters long";
    } else {
        passwordError.textContent = "";
    }
}

function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}