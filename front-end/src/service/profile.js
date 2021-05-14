import axios from 'axios';
import { saveToken, getToken } from '../helpers/localStorage';

export default async function fetchUpdate(email, name, id) {
  const requestTokenUrl = `http://localhost:3001/user/${id}`;
  // const { REACT_APP_CLIENT_SECRET } = process.env;
  // console.log(REACT_APP_CLIENT_SECRET);

  const token = getToken();

  const requestHeader = {
    'Content-Type': 'application/json',
    Authorization: token.token,

  };
  console.log(requestHeader);

  const requestBody = {
    email,
    name,
  };

  try {
    console.log(requestBody);
    const res = await axios.put(requestTokenUrl, requestBody, { headers: requestHeader });
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
