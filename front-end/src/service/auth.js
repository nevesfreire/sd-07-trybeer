import axios from 'axios';
import { saveToken } from '../helpers/localStorage';

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
    const { data } = res;
    if (data) {
      saveToken(data);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}
