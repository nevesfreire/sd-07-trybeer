const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

function getUser(userLogin) {
  api.post('/login', userLogin)
    .then(({ data }) => data);
}

export default {
  getUser,
};
