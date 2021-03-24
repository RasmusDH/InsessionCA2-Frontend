import { fetchRandomData, https } from "./apiUtils"
import * as utils from "./personUtils"
import $ from "jquery"

function findAllPeople() {
  fetchRandomData(utils.urls.all)
    .then(data => {
      const tableBody = document.getElementById("tbody")
      tableBody.innerHTML = utils.generateListFromPeople(data)
      utils.generateOnClicks(data)
    })
    .catch(utils.handlePersonErrors)
}

function handlePersonInput(e) {
  e.preventDefault()
  const body = {
    firstName: document.getElementById("fname").value,
    lastName: document.getElementById("lname").value,
    phoneNumber: document.getElementById("phone").value,
    address: {
      street: document.getElementById("street").value,
      zip: document.getElementById("zip").value,
      city: document.getElementById("city").value,
    },
  }
  const methodToUse = document.getElementById("id").value
    ? https.PUT
    : https.POST

  const successNode = document.getElementById("success")

  if (methodToUse === https.PUT) {
    const id = document.getElementById("id").value
    fetchRandomData(utils.urls.byId(id), methodToUse, body)
      .then(data => {
        successNode.innerHTML = `<p>Person with name: ${data.firstName}, was edited!</p>`
        findAllPeople()
      })
      .catch(utils.handlePersonErrors)
  } else {
    fetchRandomData(utils.urls.all, methodToUse, body)
      .then(data => {
        successNode.innerHTML = `<p>Person with name: ${data.firstName}, was created!</p>`
        findAllPeople()
      })
      .catch(utils.handlePersonErrors)
  }

  $("#myModal").modal("hide")
}

function handleDeletePerson(personId) {
  fetchRandomData(utils.urls.byId(personId), https.DELETE)
    .then(data => {
      const successNode = document.getElementById("success")
      successNode.innerHTML = `<p>Person with name: ${data.firstName} was deleted!</p>`
      findAllPeople()
    })
    .catch(utils.handlePersonErrors)



}
function handleShowPerson(personId){
    const successNode = document.getElementById("success")
    $("#showModal").modal("show")
    successNode.innerHTML=`<p>Person with id: ${personId} was shown!</p>`
}
export { findAllPeople, handlePersonInput, handleDeletePerson, handleShowPerson }
