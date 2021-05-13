import axios from 'axios';

require('dotenv').config();

const defaultPort = 3001;

const PORT = process.env.REACT_APP_PORT_BACKEND || defaultPort;

async function getOrdersDetailRequest(id) {
  const endpoint = `http://localhost:${PORT}/orders/${id}`;
  let response = {};

  try {
    response = await axios.get(endpoint);
    return response;
  } catch (error) {
    return error.response;
  }
}

export default getOrdersDetailRequest;
