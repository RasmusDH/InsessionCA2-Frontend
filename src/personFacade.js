import { fetchRandomData, https ,flushModalForm} from "./apiUtils";
import * as utils from "./personUtils";
import $ from "jquery";

var dropdowns = [];
function resetDropdowns() {
  dropdowns = [];
}
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
      option.value = data.all[i].zipCode + '!' + data.all[i].city;
      dropdown.add(option);
    }
  });
}

function addHobby(defaultHobby) {
  var hobby = "hobby" + dropdowns.length;

  dropdowns.push(hobby);
  findAllHobbies(hobby, defaultHobby);

}

function findAllHobbies(hobby, defaultHobby) {
  let dropdownDiv = document.getElementById("hobbies-id");

  let dropdown = document.createElement('select');
  dropdown.id=hobby;
  dropdown.className="form-control";
  dropdown.length = 0;



  let defaultOption = document.createElement("option");
  defaultOption.text = "Choose Hobby";

  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  
  fetchRandomData(utils.urls.allHobbies).then(data => {
    let option;
    for (let i = 0; i < data.all.length; i++) {
      option = document.createElement('option');
      option.text = data.all[i].id + '. ' + data.all[i].name;
      option.value = data.all[i].id + '!' + data.all[i].name + '!' + data.all[i].wikiLink + '!' + data.all[i].category + '!' + data.all[i].type;
      dropdown.add(option);
    }
  })
  
  defaultOption.value = defaultHobby;
  dropdownDiv.appendChild(dropdown);


}



function handleAddPerson(e) {
  e.preventDefault();
  var cityInfoStr = document.getElementById("zipCode").value;
  var cityInfoSplit = cityInfoStr.split("!");

  const hobbyBody = [];

  for (let i = 0; i < dropdowns.length; i++) {
    var hobbiesStr = document.getElementById(dropdowns[i]).value;
    var hobbiesSplit = hobbiesStr.split("!");

    hobbyBody.push( { 
    name: hobbiesSplit[1],
    wikiLink: hobbiesSplit[2],
    category: hobbiesSplit[3],
    type: hobbiesSplit[4]
  })
  }
  
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
    hobbies: hobbyBody,
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
  console.log(body);
  const successNode = document.getElementById("success");
  fetchRandomData(
    utils.urls.all + document.getElementById("id").value,
    methodToUse,
    body
  )
    .then(data => {
      successNode.innerHTML = `<p>Person with name: ${data.firstName}, was saved!</p>`;
      findAllPeople();
    })
    .catch(utils.handlePersonErrors);
    flushModalForm();
  $("#AddModal").modal("hide");
}

function handleShowPerson(personId) {
  const successNode = document.getElementById("success");
  $("#showModal").modal("show");
  successNode.innerHTML = `<p>Person with id: ${personId} was shown!</p>`;
}
export {
  findAllPeople,
  findAllZipCodes,
  findAllHobbies,
  handleShowPerson,
  handleAddPerson,
  addHobby,
  resetDropdowns
};
