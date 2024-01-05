import { apiUrl } from "./config.js";
const transferContainer = document.getElementById("transfer-container");
const usersArray = [];

function send(to, from, note, balance) {
  const me = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  fetch(`${apiUrl}/transfer`, {
    method: "POST",
    body: JSON.stringify({
      username: me,
      token: token,
      from: from,
      to: to,
      amount: +balance,
      note: note,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        usersArray.push(item.username);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getAll() {
  const ddd = await fetch(apiUrl + `/balances`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });

  // console.log(usersArray);
  ddd.forEach((item) => {
    usersArray.push(item.username);
  });
}

async function getMents(username) {
  fetch(apiUrl + `/balances`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        if (item.username === username) {
          const balance = item.value;
          return balance;
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

async function loadpage() {
  await getAll();

  transferContainer.innerHTML = "";

  const balance = document.createElement("input");
  const from = document.createElement("select");
  const to = document.createElement("select");
  const note = document.createElement("textarea");
  note.placeholder = "description";
  balance.type = "number";
  balance.placeholder = "100";
  const submit = document.createElement("button");
  submit.setAttribute(
    "class",
    "w-full rounded-sm py-3 text-xl font-medium text-white bg-indigo-700 hover:bg-indigo-500 transition-colors"
  );
  submit.textContent = "submit";

  submit.addEventListener("click", () => {
    const confirmed = confirm(
      "Are you sure you want to transfer this much ment?"
    );
    if (confirmed) {
      const sender = getMents(from);
      if (sender < balance) {
        window.alert("Sender doesn't have enough money");
      } else {
        send(to.value, from.value, note.value, balance.value);
      }
    }
  });
  // balance.classList.add("bg-indigo-400");
  transferContainer.appendChild(from);
  transferContainer.appendChild(to);
  transferContainer.appendChild(balance);
  transferContainer.appendChild(note);
  transferContainer.appendChild(submit);
  const me = "admin";
  if (me == "admin") {
    usersArray.forEach((element) => {
      console.log(element);
      const t = document.createElement("option");
      t.textContent = element;
      to.appendChild(t);
    });

    usersArray.forEach((element) => {
      const t = document.createElement("option");
      t.textContent = element;
      from.appendChild(t);
    });
  } else {
    const temp = users.filter((usersArray) => usersArray != me);
    temp.forEach((element) => {
      const t = document.createElement("option");
      t.textContent = element;
      to.appendChild(t);
    });
    const t = document.createElement("option");
    t.textContent = me;
    from.appendChild(t);
  }
}

loadpage();
