// import axios from 'axios';
// import { useContext } from 'react';
// import TrybeerContext from '../context/TrybeerContext';

function useFetch() {
  async function login(email, password) {
    const result = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await result.json();
    console.log('data', data);
    return data;
  }

  async function register(name, email, password, role) {

  }

  return (
    { login, register }
  );
}

export default useFetch;
