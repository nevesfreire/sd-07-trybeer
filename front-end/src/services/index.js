const axios = require('axios');
const urlAPI = `http://localhost:3001`;

const requestLoginAPI = (formData) => {
  const endpoint = `${urlAPI}/users/login`;
  return axios.post(endpoint, formData)
    .then(response => response)
    .catch(error => error)
    

}

export default requestLoginAPI;