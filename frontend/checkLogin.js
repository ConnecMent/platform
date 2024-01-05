const urlSplit = window.location.href.split("/");
if (
  urlSplit[urlSplit.length - 1] != "login.html" &&
  localStorage.getItem("username") == null
) {
  window.location.href = "./login.html";
}
