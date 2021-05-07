import { getStorage } from './localStorage';

const URL = process.env.REACT_APP_ENDPOINT || 'http://localhost:3001';

const ENDPOINT = {
  login: '/login',
  getUser: '/login/',
  getProducts: '/products',
  sendSale: '/sale',
  // event: '/event',
  // user: '/user',
  // token: '/oauth/token'
};

const headers = { 'Content-Type': 'application/json' };

export async function login(userData) {
  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify(userData),
  };
  const request = await fetch(URL + ENDPOINT.login, requestOptions);
  const response = request.json();
  return response;
}

export async function getByEmail(email) {
  const requestOptions = {
    method: 'POST',
    headers,
  };
  const request = await fetch(URL + ENDPOINT.getUser + email, requestOptions);
  const response = request.json();
  return response;
}

export async function getProducts() {
  const request = await fetch(URL + ENDPOINT.getProducts);
  const response = request.json();
  return response;
}

export async function sendSale(street, houseNumber, totalPrice, products) {
  const token = getStorage('token');
  const { email } = getStorage('user');
  const toObjectWithIdAndQuantity = ({ id, quantity }) => {
    const newObject = { id, quantity };
    return newObject;
  };
  const salesProducts = products.map((product) => product.quantity > 0
  && toObjectWithIdAndQuantity(product));
  const data = {
    email,
    total_price: totalPrice,
    delivery_address: street,
    delivery_number: houseNumber,
    products_sales: salesProducts,
  };
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorizathion: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const request = await fetch(URL + ENDPOINT.sendSale + email, requestOptions);
  const response = request.json();
  return response;
}
