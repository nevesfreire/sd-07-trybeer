import axios from 'axios';

require('dotenv').config();

const defaultPort = 3001;

const PORT = process.env.REACT_APP_PORT_BACKEND || defaultPort;

export async function loginRequest(email, password) {
  const endpoint = `http://localhost:${PORT}/login`;
  let response = {};

  try {
    response = await axios.post(endpoint, {
      email,
      password,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function nameChangeRequest(name, email) {
  const endpoint = `http://localhost:${PORT}/profile`;
  let response = {};

  try {
    response = await axios.put(endpoint, {
      name,
      email,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function registerNewUser(name, email, password, role) {
  const endpoint = `http://localhost:${PORT}/register`;
  let response = {};

  try {
    response = await axios.post(endpoint, {
      name,
      email,
      password,
      role,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
