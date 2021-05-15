// import axios from 'axios';
// import { useContext } from 'react';
// import TrybeerContext from '../context/TrybeerContext';

function useFetch() {
  const methods = {
    post: 'POST',
    get: 'GET',
    put: 'PUT',
  };

  const routes = {
    sales: 'http://localhost:3001/sales',
  };

  const informationType = 'application/json';

  async function login(email, password) {
    const result = await fetch('http://localhost:3001/login', {
      method: methods.post,
      headers: {
        Accept: informationType,
        'Content-Type': informationType,
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await result.json();
    return data;
  }

  async function register(name, email, password, roleParam) {
    const role = roleParam ? 'administrator' : 'client';
    const result = await fetch('http://localhost:3001/register', {
      method: methods.post,
      headers: {
        Accept: informationType,
        'Content-Type': informationType,
      },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await result.json();
    return data;
  }

  async function updateProfileName(name, email, token) {
    const result = await fetch('http://localhost:3001/profile', {
      method: 'PUT',
      headers: {
        Accept: informationType,
        'Content-Type': informationType,
        Authorization: token,
      },
      body: JSON.stringify({ email, name }),
    });
    const responseAPI = await result.json();
    return responseAPI;
  }

  async function getOrdersByEmail(email, token) {
    const result = await fetch('http://localhost:3001/orders', {
      method: 'GET',
      headers: {
        Accept: informationType,
        'Content-Type': informationType,
        Authorization: token,
        Email: email,
      },
    });
    const responseAPI = await result.json();
    return responseAPI;
  }

  async function getProducts(token) {
    const result = await fetch('http://localhost:3001/products', {
      method: 'GET',
      headers: {
        Accept: informationType,
        'Content-Type': informationType,
        Authorization: token,
      },
    });
    const responseAPI = await result.json();
    return responseAPI;
  }

  async function getOrders(token) {
    const result = await fetch(routes.sales, {
      method: 'GET',
      headers: {
        Accept: informationType,
        'Content-Type': informationType,
        Authorization: token,
      },
    });
    const responseAPI = await result.json();
    return responseAPI;
  }

  async function postSales(args) {
    const { status, user, address, total, localStorageSalved } = args;
    const { token } = user;
    const { deliveryAddress, deliveryNumber } = address;
    const result = await fetch(routes.sales, {
      method: 'POST',
      headers: {
        Authorization: token,
        Accept: informationType,
        'Content-Type': informationType,
      },
      body: JSON.stringify({
        totalPrice: total,
        deliveryAddress,
        deliveryNumber,
        status,
        listproducts: localStorageSalved,
      }),
    });
    const data = await result.json();
    return data;
  }

  async function getOrderById(token, id) {
    const result = await fetch(`http://localhost:3001/sales/${id}`, {
      method: 'GET',
      headers: {
        Accept: informationType,
        'Content-Type': informationType,
        Authorization: token,
      },
    });
    const responseAPI = await result.json();
    return responseAPI;
  }

  async function putSales(token, status, id) {
    const result = await fetch(`http://localhost:3001/sales/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: token,
        Accept: informationType,
        'Content-Type': informationType,
      },
      body: JSON.stringify({
        status,
      }),
    });
    const data = await result.json();
    return data;
  }

  return (
    {
      login,
      updateProfileName,
      register,
      getOrdersByEmail,
      getProducts,
      postSales,
      getOrderById,
      putSales,
      getOrders,
    }
  );
}

export default useFetch;
