import { getToLocalStorage } from '../utils/localStorage';

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

const requestAlterUserAPI = (user) => {
  const endpoint = `${urlAPI}/profile`;
  return axios
    .put(endpoint, user)
    .then((response) => response)
    .catch((error) => error.response);
};

const requestGetProductsAPI = () => {
  const endpoint = `${urlAPI}/products`;
  const { token } = getToLocalStorage('user');
  // console.log(token, 'token');
  const headersAxios = { headers: { Authorization: token } };
  return axios
    .get(endpoint, headersAxios)
    .then((response) => response)
    .catch((error) => error.response);
};

const requestCreateSaleAPI = (body) => {
  const endpoint = `${urlAPI}/products/sale`;
  const { token } = getToLocalStorage('user');
  console.log(token, 'token');
  const headersAxios = { headers: { Authorization: token } };
  return axios
    .post(endpoint, body, headersAxios)
    .then((response) => response)
    .catch((error) => error.response);
};

const requestGetOrdersAPI = () => {
  const endpoint = `${urlAPI}/orders`;
  const { token } = getToLocalStorage('user');
  const headersAxios = { headers: { Authorization: token } };
  return axios
    .get(endpoint, headersAxios)
    .then((response) => response)
    .catch((error) => error.response);
};

export {
  requestLoginAPI,
  requestCreateUserAPI,
  requestAlterUserAPI,
  requestGetProductsAPI,
  requestCreateSaleAPI,
  requestGetOrdersAPI,
};
