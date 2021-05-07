import axios from 'axios';
import { saveToken } from '../helpers/localStorage';

export default async function fetchUser(name, email, password, iWantToSell) {
  const requestUserUrl = 'http://localhost:3001/user';

  const requestHeader = {
    'Content-Type': 'application/json',
  };

  const requestBody = {
    name,
    email,
    password,
    iWantToSell,
  };

  try {
    const res = await axios.post(requestUserUrl, requestBody, requestHeader);
    console.log('res', res);
    const { data } = res;
    if (data) {
      saveToken(data);
      return data;
    }
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
