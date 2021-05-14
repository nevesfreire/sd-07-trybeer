import axios from 'axios';
import { saveToken, getToken } from '../helpers/localStorage';

export default async function fetchUpdate(email, name, id) {
  const requestTokenUrl = `http://localhost:3001/user/${id}`;

  const token = getToken();

  const requestHeader = {
    'Content-Type': 'application/json',
    Authorization: token.token,

  };

  const requestBody = {
    email,
    name,
  };

  try {
    const res = await axios.put(requestTokenUrl, requestBody, { headers: requestHeader });
    const { data } = res;
    if (data) {
      saveToken(data);
      return res.status;
    }
  } catch (error) {
    console.error(error);
  }
}
