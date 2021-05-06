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

const updateNameUser = (userData, token) => api
  .put('/user', userData, { headers: { Authorization: token } })
  .then(({ status }) => ({ status }))
  .catch((e) => e.message);

  const getProducts = () => api.get('/products')
  .then(({ data }) => data)
  .catch((e) => e.message);

export {
  getUser,
  registerUser,
  updateNameUser,
  getProducts,
};
