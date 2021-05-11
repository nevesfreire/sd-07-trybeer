import axios from 'axios';

const url = 'http://localhost:3001/';
const login = 'login';
const register = 'login/register';
const products = 'products';

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

async function updateUser(userData) {
  try {
    const response = await axios.put(`${url}${register}`, userData);
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

export { requestToken, registerUser, getProducts, updateUser };
