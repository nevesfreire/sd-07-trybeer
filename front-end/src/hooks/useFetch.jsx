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
    console.log(data)
    return data;
  }

  async function register(name, email, password, roleParam) {
    const role = roleParam ? 'administrator' : 'client';
    console.log(role)
    const result = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role })
    });
    const data = await result.json();
    console.log(data)
    return data;
  }

  return (
    { login, register }
  );
}

export default useFetch;
