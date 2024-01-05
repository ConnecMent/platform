async function headerAPI() {
  const apiUrl = "http://localhost:3000";
  const response = await fetch(`${apiUrl}/profile`).then((j) => {
    return j.json();
  });

  document.getElementById("header-name").textContent = response["name"];
  document.getElementById("header-token").textContent = response["token"];
}

document.addEventListener("DOMContentLoaded", headerAPI);
