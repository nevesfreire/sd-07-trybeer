const axios = require('axios');

const urlAPI = 'http://localhost:3001';

const requestLoginAPI = (formData) => {
  const endpoint = `${urlAPI}/users/login`;
  return axios
    .post(endpoint, formData)
    .then((response) => response)
    .catch((error) => error);
};

const requestCreateUserAPI = (user) => {
  const endpoint = `${urlAPI}/users`;
  return axios
    .post(endpoint, user)
    .then((response) => response)
    .catch((error) => error.response);
};

// axios.get('/user/12345')
// .catch(function (error) {
// console.log(error.toJSON());
// });

export {
  requestLoginAPI,
  requestCreateUserAPI,
};
