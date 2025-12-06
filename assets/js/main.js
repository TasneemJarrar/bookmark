const inputs = document.querySelectorAll(".form-control");
const bookmarkForm = document.querySelector(".bookmark-form");
const sitesData = document.querySelector(".sitesData");
const sites = JSON.parse(localStorage.getItem("sites"));

bookmarkForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const site = {
    name: inputs[0].value,
    url: inputs[1].value,
    email: inputs[2].value,
    password: inputs[3].value,
  };
  sites.push(site);
  localStorage.setItem("sites", JSON.stringify(sites));
});

const displaySites = () => {
  const result = sites.map(
    (site) =>
      `<tr>
        <td>${site.name}</td>
        <td>${site.url}</td>
        <td>${site.email}</td>
        <td>${site.password}</td>
      </tr>`
  );
  console.log(result);

  document.querySelector(".sitesData").innerHTML = result;
};


displaySites();
