import { apiUrl } from "./config.js";

async function headerAPI() {
  const response = await fetch(`${apiUrl}/profile`).then((j) => {
    return j.json();
  });

  document.getElementById("header-name").textContent = response["name"];
  document.getElementById("header-token").textContent = response["token"];
}

document.addEventListener("DOMContentLoaded", headerAPI);
