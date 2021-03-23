import $ from "jquery"


const urls = {
    all: "https://api.tobias-z.com/insession-CA2/person/",
    
  }


  function generateListFromPeople(data) {
    const rows = data.all.map(
      p => `
      <tr>
        <td>${p.id}</td>
        <td>${p.firstName}</td>
        <td>${p.lastName}</td>
        <td>${p.phoneNumber}</td>
        <td>${p.address.street}</td>
        <td>${p.address.zip}</td>
        <td>${p.address.city}</td>
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


  export { urls, generateListFromPeople}