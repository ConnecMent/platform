let dataArray = [];
let text = `
<div class="bg-indigo-600 p-3 rounded-lg text-white font-sans font-medium">User</div>
<div class="bg-indigo-600 p-3 rounded-lg col-span-2 text-white font-sans font-medium">Balance</div>
`;

async function fetchData() {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();
  dataArray = data;
  console.log(dataArray);
  await dataArray.forEach(
    (items) =>
      (text += `<div class="flex bg-indigo-100 p-3 rounded-lg text-indigo-900 font-sans font-medium"><img src="profile-user.svg" class="mr-3 size-7"/>${items["username"]}</div>
<div class="flex bg-indigo-100 p-3 rounded-lg col-span-2 text-indigo-900 font-sans font-medium">${items["balance"]}<img src="MENT-LOGO.svg" class="ml-2 size-6"/></div>`)
  );

  document.getElementById("Users").innerHTML = text;
}

fetchData();
