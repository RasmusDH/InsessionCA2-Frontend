import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap"
import $ from "jquery"
import { findAllPeople, handlePersonInput } from "./personFacade"

// Load all on page load
findAllPeople()
$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tbody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
// Reload button
const reloadButtonNode = document.getElementById("reload")
reloadButtonNode.addEventListener("click", findAllPeople)

// Handle the form submit
const addPersonFormNode = document.getElementById("add-person-form")
addPersonFormNode.addEventListener("submit", handlePersonInput)




