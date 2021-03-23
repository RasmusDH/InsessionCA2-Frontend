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
  
  export { fetchRandomData, https }
  