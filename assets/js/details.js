const siteName = document.querySelector(".siteName");
const sites = JSON.parse(localStorage.getItem("sites"));
const params = new URLSearchParams(location.search);
const id = params.get("id");

console.log(sites[id]);

document.querySelector(".siteName").textContent = sites[id].name;
document.querySelector(".siteURL").textContent = sites[id].url;
document.querySelector(".userEmail").textContent = sites[id].email;
document.querySelector(".userPass").textContent = sites[id].password;

