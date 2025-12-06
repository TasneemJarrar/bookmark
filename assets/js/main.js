const inputs = document.querySelectorAll(".form-control");
const bookmarkForm = document.querySelector(".bookmark-form");
const sitesData = document.querySelector(".sitesData");
const sites = JSON.parse(localStorage.getItem("sites") || "[]");
let deleteAllbtn = document.querySelector(".deleteAllbtn");
const searchInput = document.querySelector(".searchInput");
let updateIndex = null;


//validation functions
const validateSiteName = () => {
  const regex = /^[A-Z][a-zA-Z]{2,12}$/;
  if (!regex.test(inputs[0].value)) {
    inputs[0].classList.remove("is-valid");
    inputs[0].classList.add("is-invalid");
    document.querySelector(".nameError").textContent = "Invalid Site Name";
    return false;
  } else {
    inputs[0].classList.add("is-valid");
    inputs[0].classList.remove("is-invalid");
    document.querySelector(".nameError").textContent = "";
    return true;
  }
};

const validateSiteURL = () => {
  const regex =
    /^(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  if (!regex.test(inputs[1].value)) {
    inputs[1].classList.remove("is-valid");
    inputs[1].classList.add("is-invalid");
    document.querySelector(".urlError").textContent = "Invalid Site URL";
    return false;
  } else {
    inputs[1].classList.add("is-valid");
    inputs[1].classList.remove("is-invalid");
    document.querySelector(".urlError").textContent = "";
    return true;
  }
};

const validateUserEmail = () => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(inputs[2].value)) {
    inputs[2].classList.remove("is-valid");
    inputs[2].classList.add("is-invalid");
    document.querySelector(".emailError").textContent = "Invalid User Email";
    return false;
  } else {
    inputs[2].classList.add("is-valid");
    inputs[2].classList.remove("is-invalid");
    document.querySelector(".emailError").textContent = "";
    return true;
  }
};

const validateUserPass = () => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!regex.test(inputs[3].value)) {
    inputs[3].classList.remove("is-valid");
    inputs[3].classList.add("is-invalid");
    document.querySelector(".passError").textContent = "Invalid User Password";
    return false;
  } else {
    inputs[3].classList.add("is-valid");
    inputs[3].classList.remove("is-invalid");
    document.querySelector(".passError").textContent = "";
    return true;
  }
};

inputs[0].addEventListener("input", validateSiteName);
inputs[1].addEventListener("input", validateSiteURL);
inputs[2].addEventListener("input", validateUserEmail);
inputs[3].addEventListener("input", validateUserPass);

// add data
bookmarkForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    !validateSiteName() ||
    !validateSiteURL() ||
    !validateUserEmail() ||
    !validateUserPass()
  ) {
    alert("invalid data");
    return;
  }

  const site = {
    name: inputs[0].value,
    url: inputs[1].value,
    email: inputs[2].value,
    password: inputs[3].value,
  };

  if (updateIndex !== null) {
    sites[updateIndex] = site;
    updateIndex = null;
  } else {
    sites.push(site);
  }

  localStorage.setItem("sites", JSON.stringify(sites));
  displaySites();
});

// display data
const displaySites = () => {
  const result = sites.map(
    (site, index) =>
      `<tr>
        <td>${index + 1}</td>
        <td>${site.name}</td>
        <td>${site.url}</td>
        <td class="d-flex gap-4"><a href="./details.html?id=${index}">details</a>
        <button class="btn btn-outline-success" onclick="updateSite(${index})">update</button>
        <button class="btn btn-outline-danger" onclick=deleteSite(${index})>delete</button></td>

      </tr>`
  );
  document.querySelector(".sitesData").innerHTML = result;
};

displaySites();

//delete site
const deleteSite = (index) => {
  sites.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(sites));
  displaySites();
};

//delete all sites
deleteAllbtn.addEventListener("click", () => {
  localStorage.removeItem("sites");
  sites = [];
  displaySites();
});

//search sites
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  const filteredSites = sites.filter((site) => {
    return (
      site.name.toLowerCase().includes(searchTerm) ||
      site.url.toLowerCase().includes(searchTerm)
    );
  });

  const result = filteredSites.map(
    (site, index) =>
      `<tr>
        <td>${index + 1}</td>
        <td>${site.name}</td>
        <td>${site.url}</td>
        <td class="d-flex gap-4"><a href="./details.html?id=${index}">details</a>
        <button class="btn btn-outline-success" onclick="updateSite(${index})">update</button>
        <button class="btn btn-outline-danger" onclick=deleteSite(${index})>delete</button></td>
      </tr>`
  );
  document.querySelector(".sitesData").innerHTML = result;
});

//update site
const updateSite = (index) => {
  inputs[0].value = sites[index].name;
  inputs[1].value = sites[index].url;
  inputs[2].value = sites[index].email;
  inputs[3].value = sites[index].password;
  
  updateIndex = index;
  
  validateSiteName();
  validateSiteURL();
  validateUserEmail();
  validateUserPass();

};