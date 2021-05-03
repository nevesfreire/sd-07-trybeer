const API_URL = 'http://localhost:3001';
const axios = require('axios');

const instance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

module.exports = {
  instance,
};
