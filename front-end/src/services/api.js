import axios from 'axios';

const endpoint = 'http://localhost:3001';

async function registerUser(data) {
  const response = await (await fetch(`${endpoint}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })).json();

  return response;
}

async function loginUser(email, password) {
  const options = {
    method: 'POST',
    url: `${endpoint}/login`,
    headers: { 'Content-Type': 'application/json' },
    data: { email, password },
  };

  return axios.request(options)
    .then((response) => response.data).catch((error) => error.response.data);
}

export default {
  registerUser,
  loginUser,
};
