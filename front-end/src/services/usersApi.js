import axios from 'axios';
require('dotenv').config();

const PORT = process.env.REACT_APP_PORT_BACKEND || 3001;

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
