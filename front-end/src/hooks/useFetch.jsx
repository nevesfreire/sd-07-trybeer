// import axios from 'axios';
// import { useContext } from 'react';
// import TrybeerContext from '../context/TrybeerContext';

function useFetch() {
  const methods = {
    post: 'POST',
  };

  const headerWithoutToken = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  async function login(email, password) {
    const result = await fetch('http://localhost:3001/login', {
      method: methods.post,
      headers: headerWithoutToken,
      body: JSON.stringify({ email, password }),
    });
    const data = await result.json();
    return data;
  }

  async function register(name, email, password, roleParam) {
    const role = roleParam ? 'administrator' : 'client';
    const result = await fetch('http://localhost:3001/register', {
      method: methods.post,
      headers: headerWithoutToken,
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await result.json();
    return data;
  }

  return (
    { login, register }
  );
}

export default useFetch;
