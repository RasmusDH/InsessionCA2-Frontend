import {resetDropdowns} from "./personFacade"

function makeOptions(method, body) {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    }
    if (body) {
      opts.body = JSON.stringify(body)
    }
    return opts
  }
  
  function flushModalForm(){
    document.getElementById("email").value=null;
    document.getElementById("id").value=null;
    document.getElementById("firstName").value=null;
    document.getElementById("lastName").value=null;
    document.getElementById("number").value=null;
    document.getElementById("email").value=null;
    document.getElementById("street").value=null;
    document.getElementById("additionalInfo").value=null;
    document.getElementById("zipCode").selectedIndex=0;
    document.getElementById("hobbies-id").innerHTML='<label for="hobbies">Hobbies</label>';
    resetDropdowns();
  }
  function handleHttpErrors(res) {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json()
  }
  
  function fetchRandomData(url, method, body) {
    return fetch(url, method && makeOptions(method, body)).then(handleHttpErrors)
  }
  
  const https = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE",
    PUT: "PUT",
  }
  
  export { fetchRandomData, https,flushModalForm }
  