import 'isomorphic-fetch';

const apiUrl = 'http://localhost:3001/';

const fetchApi = (endPoint, payload = {}, method = 'get') => {
  const request = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    ...(method !== 'get') ? {
      body: JSON.stringify(payload)
    } : {}
  };

  const requestUrl = `${apiUrl}${endPoint}`;

  return fetch(requestUrl, request)
    .then(response => (
      response.json()
        .then(json => ({ json, response }))
        .catch(() => ({ json: {}, response }))
    ))
    .then(({ json, response }) => {
      if (response.ok === false) {
        throw json;
      }
      return json;
    })
    .catch((e) => {
      if (e.response && e.response.json) {
        return e.response.json().then((json) => {
          if (json) throw json;
          throw e;
        });
      }
      throw e;
    });
};

export const fetchData = (endpoint, payload, method) => fetchApi(endpoint, { payload }, method);
