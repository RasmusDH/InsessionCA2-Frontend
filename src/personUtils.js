import $ from "jquery"
import { handleDeletePerson } from "./personFacade"

const urls = {
  all: "https://api.tobias-z.com/insession-CA2/api/person/",
  byId: id => `https://api.tobias-z.com/insession-CA2/api/person/`,
}

function handlePersonErrors(err) {
  if (err.status) {
    const errorNode = document.getElementById("error")
    console.log(err)
    err.fullError.then(
      error => (errorNode.innerText = error.code + ": " + error.message)
    )
  } else {
    console.error(err)
  }
}

function generateListFromPeople(data) {
  const rows = data.all.map(
    p => `
    <tr>
    <td>${p.id}</td>
    <td>${p.firstName}</td>
    <td>${p.lastName}</td>
    <td>${p.email}</td>
    <td>
      <a href="#" id="editperson${p.id}">Edit</a>
      / 
      <a href="#" id="deleteperson${p.id}">delete</a>
      </td>
    </tr>
  `
  )

  return rows.join("")
}

function generateOnClicks(data) {
 data.all.map(p => {
    //edit button
    const editButtonNode = document.getElementById(`editperson${p.id}`)
    editButtonNode.addEventListener("click", () => {
      //Add id to hidden input
      document.getElementById("id").value = p.id
      document.getElementById("fname").value = p.firstName
      document.getElementById("lname").value = p.lastName
      document.getElementById("phone").value = p.phoneNumber
      document.getElementById("street").value = p.address.street
      document.getElementById("zip").value = p.address.zip
      document.getElementById("city").value = p.address.city
      $("#myModal").modal("show")
    })
    //delete button
    const deleteButtonNode = document.getElementById(`deleteperson${p.id}`)
    deleteButtonNode.addEventListener("click", () => handleDeletePerson(p.id))
  })
}

export { urls, generateListFromPeople, handlePersonErrors, generateOnClicks }
