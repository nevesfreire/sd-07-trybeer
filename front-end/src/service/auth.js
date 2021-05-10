import axios from 'axios';
import { saveToken, getToken } from '../helpers/localStorage';  //, getToken

export default async function fetchToken(email, password) {
  const requestTokenUrl = 'http://localhost:3001/login';
  // const { REACT_APP_CLIENT_SECRET } = process.env;
  // console.log(REACT_APP_CLIENT_SECRET);



  const requestHeader = {
    'Content-Type': 'application/json',
        // "secret-key": process.env.REACT_APP_SECRET,
  };

  

  const requestBody = {
    email,
    password,
  };

  try {
    const res = await axios.post(requestTokenUrl, requestBody, requestHeader);
    console.log('auth');
    console.log(res);
    const { data } = res;
    if (data) {
      saveToken(data);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}
