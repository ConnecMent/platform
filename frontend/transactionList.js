import {apiUrl} from "./config.js"
const table = document.getElementById("table");
const myBody = document.getElementById("bodyTransactionsRow");
fetch(`${apiUrl}/transactions`)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {    
      const record = document.createElement("tr");
      const timestamp = document.createElement("td");
      const mainDate = new Date (+item.timestamp);
      timestamp.innerHTML = `${mainDate.getMonth()} / ${mainDate.getDay()} / ${mainDate.getFullYear()}`;
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
