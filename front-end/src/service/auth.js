import axios from 'axios';
import { saveToken } from '../helpers/localStorage'; // , getToken

export default async function fetchToken(email, password) {
  const requestTokenUrl = 'http://localhost:3001/login';

  const requestHeader = {
    'Content-Type': 'application/json',
  };

  const requestBody = {
    email,
    password,
  };

  try {
    const res = await axios.post(requestTokenUrl, requestBody, { header: requestHeader });
    console.log('auth');
    console.log('res auth', res);
    const { data } = res;
    if (data) {
      saveToken(data);
      return data;
    }
  } catch (error) {
    console.log('errou aqui');
    console.error(error);
  }
}
