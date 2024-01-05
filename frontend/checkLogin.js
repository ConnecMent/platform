const urlSplit = window.location.pathname.split("/");
if (
  urlSplit[urlSplit.length - 1] != "login.html" &&
  localStorage.getItem("username") == null &&
  localStorage.getItem("token") == null
) {
  window.location.href = "./login.html";
}
