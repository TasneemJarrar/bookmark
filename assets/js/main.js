const inputs = document.querySelectorAll(".form-control");
const bookmarkForm = document.querySelector(".bookmark-form");
const sitesData = document.querySelector(".sitesData");
const sites = JSON.parse(localStorage.getItem("sites"));

// add data
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

// display data
const displaySites = () => {
  const result = sites.map(
    (site, index) =>
      `<tr>
        <td>${index + 1}</td>
        <td>${site.name}</td>
        <td>${site.url}</td>
        <td><a href="./details.html?id=${index}">details</a></td>
      </tr>`
  );
  console.log(result);

  document.querySelector(".sitesData").innerHTML = result;
};

displaySites();
