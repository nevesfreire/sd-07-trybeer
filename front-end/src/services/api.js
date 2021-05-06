import axios from 'axios';

const endpoint = 'http://localhost:3001';
const headers = { 'Content-Type': 'application/json' };

async function getProducts() {
  const response = await (await fetch(`${endpoint}/products`)).json();
  return response;
}

async function registerUser(data) {
  const response = await (await fetch(`${endpoint}/register`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })).json();

  return response;
}

async function loginUser(email, password) {
  const options = {
    method: 'POST',
    url: `${endpoint}/login`,
    headers,
    data: { email, password },
  };

  return axios.request(options)
    .then((response) => response.data).catch((error) => error.response.data);
}

export default {
  registerUser,
  loginUser,
  getProducts,
};
