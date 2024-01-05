import { apiUrl } from "./config.js";

async function headerAPI() {
  const username = localStorage.getItem("username");
  const response = await fetch(`${apiUrl}/info`, {
    method: "POST",
    body: JSON.stringify({
      username: username,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((j) => {
    return j.json();
  });

  document.getElementById("header-name").textContent = username;
  document.getElementById("header-token").textContent = response["balance"];
}

document.addEventListener("DOMContentLoaded", headerAPI);
