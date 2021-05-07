import axios from 'axios';

const endpoint = 'http://localhost:3001';
const applicationJson = 'application/json';

async function registerUser(data) {
  const response = await (await fetch(`${endpoint}/register`, {
    method: 'POST',
    headers: { 'Content-Type': applicationJson },
    body: JSON.stringify(data),
  })).json();

  return response;
}

async function loginUser(email, password) {
  const options = {
    method: 'POST',
    url: `${endpoint}/login`,
    headers: { 'Content-Type': applicationJson },
    data: { email, password },
  };

  return axios.request(options)
    .then((response) => response.data).catch((error) => error.response.data);
}

async function updateUser(name, token) {
  const options = {
    method: 'PUT',
    url: `${endpoint}/profile`,
    headers: {
      'Content-Type': applicationJson,
      Authorization: token,
    },
    data: { name },
  };

  return axios.request(options)
    .then((response) => response.data).catch((error) => error.response.data);
}

export default {
  registerUser,
  loginUser,
  updateUser,
};
