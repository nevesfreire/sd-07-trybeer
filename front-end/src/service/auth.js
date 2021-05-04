import { saveToken } from '../helpers/localStorage';

export default async function fetchToken(email, password) {
  const requestTokenUrl = 'https://localhost:3001/login';
  // const { REACT_APP_CLIENT_SECRET } = process.env;
  // console.log(REACT_APP_CLIENT_SECRET);

  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'secret123',
    },
    body: {
      email,
      password,
    },
  };

  try {
    const response = await fetch(requestTokenUrl, request);
    console.log(response);
    const { acessToken } = await response.json();
    if (acessToken) {
      saveToken(acessToken);
      return acessToken;
    }
  } catch (error) {
    console.error(error);
  }
}

// x-www-form-urlencoded