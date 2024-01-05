const table = document.getElementById("table");
const myBody = document.getElementById("bodyTransactionsRow");
fetch("http://localhost:3000/transactions")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      const record = document.createElement("tr");
      const timestamp = document.createElement("td");
      timestamp.innerHTML = item.timestamp;
      const from = document.createElement("td");
      from.innerHTML = item.from;
      const to = document.createElement("td");
      to.innerHTML = item.to;
      const amount = document.createElement("td");
      amount.innerHTML = item.amount;
      const note = document.createElement("td");
      note.innerHTML = item.note;
      record.appendChild(timestamp);
      record.appendChild(from);
      record.appendChild(to);
      record.appendChild(amount);
      record.appendChild(note);
      myBody.appendChild(record);
    });
  });

table.appendChild(myBody);
