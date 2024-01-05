import { apiUrl } from "./config.js";

async function updateCardInfo() {
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

  document.getElementById("main-name").textContent = username;
  document.getElementById("main-token").textContent = response["balance"];
}

document.addEventListener("DOMContentLoaded", updateCardInfo);
