const urlSplit = window.location.pathname.split("/");
if (
  urlSplit[urlSplit.length - 1] != "login.html" &&
  !localStorage.getItem("username") &&
  !localStorage.getItem("token")
) {
  window.location.href = "./login.html";
}
