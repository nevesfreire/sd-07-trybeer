import axios from 'axios';
import { saveToken } from '../helpers/localStorage';

export default async function fetchToken(email, password) {
  const requestTokenUrl = 'https://localhost:3001/login';
  // const { REACT_APP_CLIENT_SECRET } = process.env;
  // console.log(REACT_APP_CLIENT_SECRET);

  const requestHeader = {
    'Content-Type': 'application/json',
  };

  const requestBody = {
    email: 'user@test.com',
    password: 'test123',
  };

  try {
    const res = await axios({
      method: 'post',
      url: requestTokenUrl,
      data: {
        email,
        password,
      },
    });

    // axios.post(requestTokenUrl, requestBody, requestHeader);

    // const response = await fetch(requestTokenUrl, request);
    console.log(res);
    const { acessToken } = await res.json();
    if (acessToken) {
      saveToken(acessToken);
      return acessToken;
    }
  } catch (error) {
    console.error(error);
  }
}

// x-www-form-urlencoded