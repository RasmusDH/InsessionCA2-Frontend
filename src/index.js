import "./style.css"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import $ from "jquery"
import { findAllPeople, handlePersonInput } from "./personFacade"

// Load all on page load
findAllPeople()

// Reload button
const reloadButtonNode = document.getElementById("reload")
reloadButtonNode.addEventListener("click", findAllPeople)

// Handle the form submit
const addPersonFormNode = document.getElementById("add-person-form")
addPersonFormNode.addEventListener("submit", handlePersonInput)




