import axios from 'axios';

require('dotenv').config();

const defaultPort = 3001;

const PORT = process.env.REACT_APP_PORT_BACKEND || defaultPort;

async function loginRequest(email, password) {
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

export default loginRequest;
