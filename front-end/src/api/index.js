import axios from 'axios';

const url = 'http://localhost:3001/';
const login = 'login';

async function requestToken(userData) {
  try {
    const token = await axios.post(`${url}${login}`, userData);
    // .then((response) => console.log(response));
    return token;
  } catch (error) {
    console.error(error);
  }
}

export default requestToken;
