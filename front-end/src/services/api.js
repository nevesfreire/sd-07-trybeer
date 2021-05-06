/* import { getStorage } from './localStorage' */

const URL = process.env.REACT_APP_ENDPOINT || 'http://localhost:3001';

// const tokenKeyStorage = 'token';

const ENDPOINT = {
  login: '/login',
  getUser: '/login/',
  getProducts: '/products',
  // levels: '/level',
  // event: '/event',
  // user: '/user',
  // token: '/oauth/token'
};

export async function login(userData) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  };
  const request = await fetch(URL + ENDPOINT.login, requestOptions);
  const response = request.json();
  return response;
}

export async function getByEmail(email) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };
  const request = await fetch(URL + ENDPOINT.getUser + email, requestOptions);
  const response = request.json();
  return response;
}

export async function getProducts() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const request = await fetch(URL + ENDPOINT.getProducts, requestOptions);
  const response = request.json();
  return response;
}
