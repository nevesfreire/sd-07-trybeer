const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

function getUser(userLogin) {
  api.post('/user/login', userLogin)
    .then(({ data }) => data);
}

const registerUser = (userData) => {
  api.post('/user/signup', userData)
    .then(({ data }) => data);
};

export {
  getUser,
  registerUser,
};
