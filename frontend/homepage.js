import { apiUrl } from "./config.js";

async function updateCardInfo() {
    const response = await fetch(`${apiUrl}/profile`).then((j) => {
      return j.json();
    });
  
    document.getElementById("main-name").textContent = response["name"];
    document.getElementById("main-token").textContent = response["token"];
  }
  
  document.addEventListener("DOMContentLoaded", updateCardInfo);
  