import axios from 'axios';

const url = 'http://localhost:3001/';
const login = 'login';
const register = 'login/register';
const products = 'products';
const orders = 'orders';

async function requestToken(userData) {
  try {
    const token = await axios.post(`${url}${login}`, userData);
    return token;
  } catch (error) {
    return error.response.status;
  }
}

async function registerUser(userData) {
  try {
    const response = await axios.post(`${url}${register}`, userData);
    return response;
  } catch (error) {
    return error.response.status;
  }
}

async function getProducts(token) {
  try {
    const productsReceived = axios
      .get(`${url}${products}`, { headers: { Authorization: token } });
    return productsReceived;
  } catch (error) {
    return error.response.status;
  }
}

async function updateUser(userData) {
  try {
    const response = await axios.put(`${url}${register}`, userData);
    return response;
  } catch (error) {
    return error.response.status;
  }
}

async function getOrdersForUser(token, id) {
  try {
    const response = await axios
      .get(`${url}${orders}/user/${id}`, { headers: { Authorization: token } });
    return response;
  } catch (error) {
    return error.response.status;
  }
}

async function getOrdersForAdmin(token) {
  try {
    const response = await axios
      .get(`${url}${orders}`, { headers: { Authorization: token } });
    return response;
  } catch (error) {
    return error.response.status;
  }
}

async function getOrdersById(token, id) {
  try {
    const response = await axios
      .get(`${url}${orders}/${id}`, { headers: { Authorization: token } });
    return response;
  } catch (error) {
    return error.response.status;
  }
}

async function createNewSale(sale, token) {
  try {
    const response = await axios
      .post(`${url}${orders}`, sale, { headers: { Authorization: token } });
    return response;
  } catch (error) {
    return error.response.status;
  }
}

async function changeStatus(token) {
  const id = { id: 1 };
  try {
    const response = await axios
      .put(`${url}${orders}/admin`, id, { headers: { Authorization: token } });
    return response;
  } catch (error) {
    return error.response.status;
  }
}

export {
  requestToken,
  registerUser,
  getProducts,
  updateUser,
  createNewSale,
  changeStatus,
  getOrdersById,
  getOrdersForUser,
  getOrdersForAdmin,
  
};
