import axios from 'axios';

const url = 'http://localhost:3001/';
const login = 'login';
const register = 'login/register';

async function requestToken(userData) {
  try {
    const token = await axios.post(`${url}${login}`, userData);
    return token;
  } catch (error) {
    console.error(error);
  }
}

async function registerUser(userData) {
  try {
    const response = await axios.post(`${url}${register}`, userData);
    console.log(response, 'api');
    return response;
  } catch (error) {
    return error.response.status;
  }
}

export { requestToken, registerUser };
