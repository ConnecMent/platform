import { isUsernameValid, isPasswordValid } from "./utils";
// import { apiUrl } from "./config.js";

let loginForm = document.getElementById("login-form");
let usernameInput = document.getElementById("username-input");
let passwordInput = document.getElementById("password-input");
let togglePasswordBtn = document.getElementById("toggle-password-btn");
let dataServerErrorElement = document.querySelector("[data-server-error]");
let usernameInputTouched = false;
let passwordInputTouched = false;

let errorsObject = {};

usernameInput.addEventListener("input", (e) => {
  if (usernameInputTouched) {
    usernameInputValidation(e.target.value);
  }
});

usernameInput.addEventListener("blur", (e) => {
  usernameInputTouched = true;
  usernameInputValidation(e.target.value);
});

passwordInput.addEventListener("input", (e) => {
  if (passwordInputTouched) {
    passwordInputValidation(e.target.value);
  }
});

passwordInput.addEventListener("blur", (e) => {
  passwordInputTouched = true;
  passwordInputValidation(e.target.value);
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  usernameInputTouched = true;
  passwordInputTouched = true;
  passwordInputValidation(passwordInput.value);
  usernameInputValidation(usernameInput.value);
  console.log(errorsObject);
  if (isObjEmpty(errorsObject)) {
    dataServerErrorElement.innerHTML = "";
    let formData = new FormData(loginForm);
    var object = {};
    formData.forEach((value, key) => (object[key] = value));
    var json = JSON.stringify(object);
    fetch(apiUrl, {
      method: "POST",
      body: json,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", object.username);
        document.location.href = "/";
      })
      .catch((err) => {
        let errorElement = document.createElement("li");
        errorElement.textContent = "username or password is incorrect";
        dataServerErrorElement.append(errorElement);
      });
  }
});

togglePasswordBtn.addEventListener("click", () => {
  let inputType = passwordInput.getAttribute("type");

  if (inputType === "password") {
    passwordInput.setAttribute("type", "text");
    togglePasswordBtn.querySelector("img").src = "/public/images/eye.png";
  } else {
    passwordInput.setAttribute("type", "password");
    togglePasswordBtn.querySelector("img").src = "/public/images/eye-slash.png";
  }
});

function isObjEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function renderError(container, field) {
  let errorElement = document.createElement("li");
  errorElement.textContent = errorsObject[field];
  container.innerHTML = "";
  container.append(errorElement);
}

function removeError(container, field) {
  container.innerHTML = "";
  delete errorsObject[field];
}

function usernameInputValidation(value) {
  if (!isUsernameValid(value)) {
    errorsObject[usernameInput.name] =
      "username must be greater than 6 characters and must not start with a number";
    renderError(usernameInput.nextElementSibling, usernameInput.name);
  } else {
    removeError(usernameInput.nextElementSibling, usernameInput.name);
  }
}

function passwordInputValidation(value) {
  if (!isPasswordValid(value)) {
    errorsObject[passwordInput.name] =
      "password must be greater than 5 characters password must containt at least one symbol or number";
    renderError(
      passwordInput.parentElement.nextElementSibling,
      passwordInput.name
    );
  } else {
    removeError(
      passwordInput.parentElement.nextElementSibling,
      passwordInput.name
    );
  }
}
