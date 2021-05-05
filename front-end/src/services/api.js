import { getStorage } from './localSorage'

const URL = process.env.REACT_APP_ENDPOINT;

const tokenKeyStorage = 'token';

const ENDPOINT = {
  login: '/login',
  // levels: '/level',
  // event: '/event',
  // user: '/user',
  // token: '/oauth/token'
}

async function x (userData) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  }
  const request = await fetch(URL + ENDPOINT.login, requestOptions);
  const response = request.json();
  return response;
}

export { x };
