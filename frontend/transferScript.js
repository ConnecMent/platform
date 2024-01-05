const usersArray = [];

function send(to, from, note, balance) {
  const me = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  fetch(`http://localhost:3000/transfer`, {
    method: "POST",
    body: JSON.stringify({  
      userusername: me,
      token: token,
      from: from,
      to: to,
      amount: balance,
      note: note,
    }),
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
  const ddd = await fetch(`http://localhost:3000/balances`)
    .then((response) => {return response.json();})
    .catch((error) => {
      console.log(error);
    });

      // console.log(usersArray);
      ddd.forEach((item) => {
        usersArray.push(item.username);
      })
}

async function getMents(username) {
  fetch(`http://localhost:3000/balances`)
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

  document.body.innerHTML = "";

  const balance = document.createElement("input");
  const from = document.createElement("select");
  const to = document.createElement("select");
  const note = document.createElement("textarea");
  note.placeholder="description";
  balance.type = "number";
  balance.placeholder = "100";
  const submit = document.createElement("button");
  submit.textContent = "submit";
  
  submit.addEventListener("click", () => {
    const confirmed = confirm(
      "Are you sure you want to transfer this much ment?"
      );
      if (confirmed) {
        userF = document.getElementById("from").value;
        userT = document.getElementById("to").value;
        balance = document.getElementById("balance").value;
        const notee = document.getElementById("note");
        const sender = getMents(from);
        if (sender < balance) {
          window.alert("Sendr doesn't have enough money");
        } else {
          send(to, from, note, balance);
        }
      }
    });
    
  document.body.appendChild(from);
  document.body.appendChild(to);
  document.body.appendChild(submit);
  document.body.appendChild(balance);
  document.body.appendChild(note);
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
