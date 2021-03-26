import $ from "jquery"
import { handleShowPerson } from "./personFacade"

const urls = {
  all: "https://api.tobias-z.com/insession-CA2/api/persons/",
  byId: id => `https://api.tobias-z.com/insession-CA2/api/persons/${id}`,
  allCities: "https://api.tobias-z.com/insession-CA2/api/cities/",
  allHobbies: "https://api.tobias-z.com/insession-CA2/api/hobbies/"
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
    <td>${p.firstName} ${p.lastName}</td>
   
    <td>${p.address.cityInfo.city}</td>
    <td>${p.email}</td>
    <td>${(p.phones.map(n=>n.number)).join(",")}</td>
    <td>${(p.hobbies.map(h=>h.name)).join(",")}</td>
    <td>
      <a href="#" id="editperson${p.id}">Edit</a>
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
      document.getElementById("email").value = p.email      
      document.getElementById("firstName").value = p.firstName
      document.getElementById("lastName").value = p.lastName
      document.getElementById("number").value = p.phones[0].number
      document.getElementById("street").value = p.address.street
      document.getElementById("additionalInfo").value = p.address.additionalInfo
      document.getElementById("zipCode").value = p.address.cityInfo.zipCode
      
      $("#AddModal").modal("show")
    })
    
    //show button
    const showButtonNode = document.getElementById(`showperson${p.id}`)
    showButtonNode.addEventListener("click", () => {
    document.getElementById("showName").innerHTML=`${p.firstName} ${p.lastName}`
    document.getElementById("showAddress").innerHTML=`Address:<br>
    ${p.address.street}<br>
    ${p.address.cityInfo.zipCode} ${p.address.cityInfo.city}  `
    document.getElementById("showEmail").innerHTML=`Email:<br>${p.email}`
    document.getElementById("showPhones").innerHTML=`Phones:<br>${(p.phones.map(n=>n.number+" ("+n.description+")")).join("<br>")}`
    document.getElementById("showHobbies").innerHTML=`Hobbies:<br>${(p.hobbies.map(n=>"<a href="+n.wikiLink+" target=\"_blank\">"+n.name+"</a> ("+n.category+") ("+n.type+")")).join("<br>")}`
    handleShowPerson(p.id)
    })
  })
}

export { urls, generateListFromPeople, handlePersonErrors, generateOnClicks }
