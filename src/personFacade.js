import { fetchRandomData, https ,flushModalForm} from "./apiUtils";
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

function handleAddPerson(e) {
  e.preventDefault();
  const body = {
    email: document.getElementById("email").value,
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    phones: [{
      number: document.getElementById("number").value,
      description: document.getElementById("description").value
    }],
    hobbies: [
        
    ],
    address: {
      street: document.getElementById("street").value,
      additionalInfo: document.getElementById("additionalInfo").value,
      cityInfo: {
          zipCode: document.getElementById("zipCode").value,
          city: document.getElementById("city").value
      }
  }

  };
  const methodToUse = document.getElementById("id").value
  ? https.PUT
  : https.POST;

  const successNode = document.getElementById("success");
  fetchRandomData((utils.urls.all+"/"+document.getElementById("id").value), methodToUse, body)
    .then(data => {
      successNode.innerHTML = `<p>Person with name: ${data.firstName}, was saved!</p>`;
      findAllPeople();
    })
    .catch(utils.handlePersonErrors);
    flushModalForm();
  $("#AddModal").modal("hide");
}


function handleShowPerson(personId){
    const successNode = document.getElementById("success")
    $("#showModal").modal("show")
    successNode.innerHTML=`<p>Person with id: ${personId} was shown!</p>`
}
export { findAllPeople,   handleShowPerson, handleAddPerson }
