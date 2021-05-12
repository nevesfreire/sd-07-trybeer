// import axios from 'axios';
// import { useContext } from 'react';
// import TrybeerContext from '../context/TrybeerContext';

function useFetch() {
  const methods = {
    post: 'POST',
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
      },
      body: JSON.stringify({ email }),
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

  return (
    {
      login,
      updateProfileName,
      register,
      getOrdersByEmail,
      getProducts,
    }
  );
}

export default useFetch;
