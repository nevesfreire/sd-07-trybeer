import axios from 'axios';
import { saveToken } from '../helpers/localStorage';

export default async function fetchUpdate(email, name, id, token) {
  const requestTokenUrl = `http://localhost:3001/user/${id}`;
  console.log(token);
  // const { REACT_APP_CLIENT_SECRET } = process.env;
  // console.log(REACT_APP_CLIENT_SECRET);

  const requestHeader = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  const requestBody = {
    email,
    name,
  };

  try {
    console.log(requestBody);
    const res = await axios.put(requestTokenUrl, requestBody, requestHeader);
    // console.log(res)
    const { data } = res;
    if (data) {
      saveToken(data);
      return res.status;
    }
  } catch (error) {
    console.error(error);
  }
}
