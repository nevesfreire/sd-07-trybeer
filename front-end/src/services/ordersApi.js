import axios from 'axios';

require('dotenv').config();

const defaultPort = 3001;

const PORT = process.env.REACT_APP_PORT_BACKEND || defaultPort;

async function ordersRequest(
  id, saleDate, totalPrice, deliveryAddress, deliveryNumber, status
) {
  const endpoint = `http://localhost:${PORT}/orders`;
  let response = {};

  try {
    response = await axios.get(endpoint, {
      id,
      saleDate,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export default ordersRequest;
