import axios from 'axios';
import {
  saveAllOrders,
  getToken,
  saveOrderById,
  saveOrderDetails,
} from '../helpers/localStorage';

const requestHeader = {
  'Content-Type': 'application/json',
};

async function fetchAllOrders() {
  const requestProductsUrl = 'http://localhost:3001/orders';

  try {
    const res = await axios.get(requestProductsUrl, requestHeader);
    const { data } = res;
    if (data) {
      saveAllOrders(data);
      return data;
    }
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

async function fetchOrderById() {
  const { id } = getToken();
  const requestProductsUrl = `http://localhost:3001/orders/${id}`;

  try {
    const res = await axios.get(requestProductsUrl, requestHeader);
    const { data } = res;
    if (data) {
      saveOrderById(data);
      return data;
    }
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

async function fetchOrderDetails(id) {
  const requestProductsUrl = `http://localhost:3001/orders/details/${id}`;

  try {
    const res = await axios.get(requestProductsUrl, requestHeader);
    const { data } = res;
    if (data) {
      saveOrderDetails(data);
      return data;
    }
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

async function fetchOrderDeliveryId(id) {
  const requestProductsUrl = 'http://localhost:3001/checkout';

  const requestBody = {
    id,
  };
  try {
    const res = await axios.patch(
      requestProductsUrl,
      requestBody,
      requestHeader,
    );
    const { data } = res;
    if (data) {
      saveOrderDetails(data);
      return data;
    }
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export {
  fetchAllOrders,
  fetchOrderById,
  fetchOrderDetails,
  fetchOrderDeliveryId,
};
