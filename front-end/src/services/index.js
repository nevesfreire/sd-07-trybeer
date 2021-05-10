const axios = require('axios');

const urlAPI = 'http://localhost:3001';

const requestLoginAPI = (formData) => {
  const endpoint = `${urlAPI}/users/login`;
  return axios
    .post(endpoint, formData)
    .then((response) => response)
    .catch((error) => error.response);
};

const requestCreateUserAPI = (user) => {
  const endpoint = `${urlAPI}/users`;
  return axios
    .post(endpoint, user)
    .then((response) => response)
    .catch((error) => error.response);
};

const requestGetProductsAPI = () => {
  const endpoint = `${urlAPI}/products`;
  return axios
    .get(endpoint)
    .then((response) => response)
    .catch((error) => error.response);
};

export {
  requestLoginAPI,
  requestCreateUserAPI,
  requestGetProductsAPI,
};
