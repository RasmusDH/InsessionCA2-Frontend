import $ from "jquery"
import { handleDeletePerson,handleShowPerson } from "./personFacade"

const urls = {
  all: "https://api.tobias-z.com/insession-CA2/api/persons/",
  byId: id => `https://api.tobias-z.com/insession-CA2/api/persons/${id}`,
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
    <td>${p.firstName}</td>
    <td>${p.lastName}</td>
    <td>${p.email}</td>
    <td>
      <a href="#" id="editperson${p.id}">Edit</a>
      / 
      <a href="#" id="deleteperson${p.id}">delete</a>
      / 
      <a href="#" id="showperson${p.id}">show</a>
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
      document.getElementById("firstName").value = p.firstName
      document.getElementById("lastName").value = p.lastName
      $("#AddModal").modal("show")
    })
    //delete button
    const deleteButtonNode = document.getElementById(`deleteperson${p.id}`)
    deleteButtonNode.addEventListener("click", () => handleDeletePerson(p.id))
    //show button
    const showButtonNode = document.getElementById(`showperson${p.id}`)
    showButtonNode.addEventListener("click", () => {
    document.getElementById("showName").innerHTML=`${p.firstName} ${p.lastName}`
    document.getElementById("showEmail").innerHTML=`${p.email}`
   
    handleShowPerson(p.id)
    })


  })
}

export { urls, generateListFromPeople, handlePersonErrors, generateOnClicks }
