var siteNameInput = document.getElementById("siteName");
var siteLinkInput = document.getElementById("siteLink");
var submit = document.getElementById("submit");
var sites;

if (localStorage.getItem("siteList") == null) {
    sites = [];
} else {
    sites = JSON.parse(localStorage.getItem("siteList"));
    display();
}

function validateURL(url) {
    var regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9-]*)*$/;
    return regex.test(url);
}

function validateSiteName(siteName) {
    var regex = /^[a-zA-Z0-9]+$/;
    return regex.test(siteName);
}

function validateSiteNameInput() {
    var siteName = siteNameInput.value;

    // Check if site name is valid
    if (validateSiteName(siteName)) {
        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-invalid");
    } else {
        siteNameInput.classList.add("is-invalid");
        siteNameInput.classList.remove("is-valid");
    }
}

function validateURLInput() {
    var siteLink = siteLinkInput.value;

    // Check if URL is valid
    if (validateURL(siteLink)) {
        siteLinkInput.classList.add("is-valid");
        siteLinkInput.classList.remove("is-invalid");
    } else {
        siteLinkInput.classList.add("is-invalid");
        siteLinkInput.classList.remove("is-valid");
    }
}

function add() {
    var siteName = siteNameInput.value;
    var siteLink = siteLinkInput.value;

    // Validate the inputs when trying to add
    validateSiteNameInput();
    validateURLInput();

    // Check if both inputs are valid
    if (!validateSiteName(siteName) || !validateURL(siteLink)) {
        alert(`Site Name or Url is not valid, Please follow the rules below :
Site name must contain at least 3 characters
Site URL must be a valid one`);
        return;
    }

    var siteDetails = {
        siteName: siteName,
        siteLink: siteLink,
    };

    sites.push(siteDetails);
    localStorage.setItem("siteList", JSON.stringify(sites));
    display();
}

function display() {
    var data = "";
    for (var i = 0; i < sites.length; i++) {
        data += `<tr>
            <th scope="row">` + (i + 1) + `</th>
            <td>` + sites[i].siteName + `</td>
            <td><a href="` + sites[i].siteLink + `" target="_blank" class="btn btn-success" id="visitBtn"><i class="fa-solid fa-eye me-2"></i>Visit</a></td>
            <td><button onclick="updateSite(` + i + `)" class="btn btn-warning text-white" id="updateBtn"><i class="fa-solid fa-rotate me-2"></i>Update</button></td>
            <td><button onclick="deleteSite(` + i + `)" class="btn btn-danger" id="deleteBtn"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = data;
}

function deleteSite(x) {
    sites.splice(x, 1);
    localStorage.setItem("siteList", JSON.stringify(sites));
    display();
}

function updateSite(y) {
    var newName = window.prompt("Enter New Site Name");
    var newLink = window.prompt("Enter New Site Link");

    // Validate new name and link
    if (!validateSiteName(newName) || !validateURL(newLink)) {
        alert("Please enter valid site name and URL.");
        return;
    }

    sites[y].siteName = newName;
    sites[y].siteLink = newLink;
    localStorage.setItem("siteList", JSON.stringify(sites));
    display();
}

function search() {
    var searchVal = searchInput.value.toLowerCase();
    var data = "";
    for (var i = 0; i < sites.length; i++) {
        if (sites[i].siteName.toLowerCase().includes(searchVal) == true) {
            data += `<tr>
                <th scope="row">` + (i + 1) + `</th>
                <td>` + sites[i].siteName + `</td>
                <td><a href="` + sites[i].siteLink + `" target="_blank" class="btn btn-success" id="visitBtn"><i class="fa-solid fa-eye me-2"></i>Visit</a></td>
                <td><button onclick="updateSite(` + i + `)" class="btn btn-warning text-white" id="updateBtn"><i class="fa-solid fa-rotate me-2"></i>Update</button></td>
                <td><button onclick="deleteSite(` + i + `)" class="btn btn-danger" id="deleteBtn"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
            </tr>`;
        }
    }
    document.getElementById("tableBody").innerHTML = data;
}
