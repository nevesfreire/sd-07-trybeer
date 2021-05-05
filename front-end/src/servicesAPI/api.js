const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

const getUser = (userLogin) => api.post('/user/login', userLogin)
  .then(({ data }) => data)
  .catch((e) => e.message);

const registerUser = (userData) => api.post('/user/signup', userData)
  .then(({ data }) => data)
  .catch((e) => e.message);

export {
  getUser,
  registerUser,
};
