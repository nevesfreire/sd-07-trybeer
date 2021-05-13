import axios from 'axios';
import { saveAllOrders, getToken, saveOrderById, getOrderById, saveOrderDetails } from '../helpers/localStorage';

async function fetchAllOrders() {
  const requestProductsUrl = 'http://localhost:3001/orders';

  const requestHeader = {
    'Content-Type': 'application/json',
  };

  try {
    const res = await axios.get(requestProductsUrl, requestHeader);
    console.log('res', res);
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
    const { id }  = getToken()
    const requestProductsUrl = `http://localhost:3001/orders/${id}`;
  
    const requestHeader = {
      'Content-Type': 'application/json',
    };
  
    try {
      const res = await axios.get(requestProductsUrl, requestHeader);
      console.log('res', res);
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
    //const { id }  = getOrderById()
    const requestProductsUrl = `http://localhost:3001/orders/details/${id}`;
  
    const requestHeader = {
      'Content-Type': 'application/json',
    };
  
    try {
      const res = await axios.get(requestProductsUrl, requestHeader);
      console.log('res', res);
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
  };
  