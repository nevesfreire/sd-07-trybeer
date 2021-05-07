import axios from 'axios';

require('dotenv').config();

const defaultPort = 3001;

const PORT = process.env.REACT_APP_PORT_BACKEND || defaultPort;

async function getProductsRequest () {
  const endpoint = `http://localhost:${PORT}/products`;
  let response = {};

  try {
    response = await axios.get(endpoint);
    return response;
  } catch (error) {
    return error.response;
  }
}

export default getProductsRequest;
