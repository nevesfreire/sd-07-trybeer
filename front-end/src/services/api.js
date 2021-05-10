const axios = require('axios').default;

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
});

console.log(`api ${api}`);
export default api;
