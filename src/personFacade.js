import { fetchRandomData, https } from "./apiUtils";
import * as utils from "./personUtils";
import $ from "jquery";

function findAllPeople() {
  fetchRandomData(utils.urls.all)
    .then(data => {
      const tableBody = document.getElementById("tbody");
      tableBody.innerHTML = utils.generateListFromPeople(data);
      utils.generateOnClicks(data);
    })
    .catch(utils.handlePersonErrors);
}

function findAllZipCodes() {
  let dropdown = document.getElementById("zipCode");
  dropdown.length = 0;

  let defaultOption = document.createElement("option");
  defaultOption.text = "Choose zipcode";

  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  fetchRandomData(utils.urls.allCities).then(data => {
    let option;
    for (let i = 0; i < data.all.length; i++) {
      option = document.createElement('option');
      option.text = data.all[i].zipCode + ' ' + data.all[i].city;
      option.value = data.all[i].zipCode + ' ' + data.all[i].city;
      dropdown.add(option);
    }
  });
}

function handlePersonInput(e) {
  e.preventDefault();
  const body = {
    email: document.getElementById("email").value,
    firstName: document.getElementById("fname").value,
    lastName: document.getElementById("lname").value,
    phones: [
      {
        number: document.getElementById("number").value,
        description: document.getElementById("description").value
      }
    ]
  };
  const methodToUse = document.getElementById("id").value
    ? https.PUT
    : https.POST;

  const successNode = document.getElementById("success");

  if (methodToUse === https.PUT) {
    const id = document.getElementById("id").value;
    fetchRandomData(utils.urls.byId(id), methodToUse, body)
      .then(data => {
        successNode.innerHTML = `<p>Person with name: ${data.firstName}, was edited!</p>`;
        findAllPeople();
      })
      .catch(utils.handlePersonErrors);
  } else {
    fetchRandomData(utils.urls.all, methodToUse, body)
      .then(data => {
        successNode.innerHTML = `<p>Person with name: ${data.firstName}, was created!</p>`;
        findAllPeople();
      })
      .catch(utils.handlePersonErrors);
  }

  $("#AddModal").modal("hide");
}

function handleAddPerson(e) {
  e.preventDefault();
  var cityInfoStr = document.getElementById("zipCode").value;
  var cityInfoSplit = cityInfoStr.split(" ");
  const body = {
    email: document.getElementById("email").value,
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    phones: [
      {
        number: document.getElementById("number").value,
        description: document.getElementById("description").value
      }
    ],
    hobbies: [],
    address: {
      street: document.getElementById("street").value,
      additionalInfo: document.getElementById("additionalInfo").value,
      cityInfo: {
        zipCode: cityInfoSplit[0],
        city: cityInfoSplit[1]
      }
    }
  };
  const methodToUse = document.getElementById("id").value
    ? https.PUT
    : https.POST;

  const successNode = document.getElementById("success");
  fetchRandomData(
    utils.urls.all + "/" + document.getElementById("id").value,
    methodToUse,
    body
  )
    .then(data => {
      successNode.innerHTML = `<p>Person with name: ${data.firstName}, was saved!</p>`;
      findAllPeople();
    })
    .catch(utils.handlePersonErrors);

  $("#AddModal").modal("hide");
}

function handleEditPerson(e) {
  e.preventDefault();
  const body = {
    email: document.getElementById("email").value,
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    phones: [
      {
        number: document.getElementById("number").value,
        description: document.getElementById("description").value
      }
    ]
  };

  const successNode = document.getElementById("success");

  fetchRandomData(utils.urls.byId(id), http.PUT, body)
    .then(data => {
      successNode.innerHTML = `<p>Person with name: ${data.firstName}, was created!</p>`;
      findAllPeople();
    })
    .catch(utils.handlePersonErrors);

  $("#EditModal").modal("hide");
}

function handleDeletePerson(personId) {
  fetchRandomData(utils.urls.byId(personId), https.DELETE)
    .then(data => {
      const successNode = document.getElementById("success");
      successNode.innerHTML = `<p>Person with name: ${data.firstName} was deleted!</p>`;
      findAllPeople();
    })
    .catch(utils.handlePersonErrors);
}
function handleShowPerson(personId) {
  const successNode = document.getElementById("success");
  $("#showModal").modal("show");
  successNode.innerHTML = `<p>Person with id: ${personId} was shown!</p>`;
}
export {
  findAllPeople,
  findAllZipCodes,
  handleEditPerson,
  handlePersonInput,
  handleDeletePerson,
  handleShowPerson,
  handleAddPerson
};
