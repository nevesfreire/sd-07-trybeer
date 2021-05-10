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
      headers: headerWithoutToken,
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
    console.log('responseAPI', responseAPI);
    return responseAPI;
  }

  return (
    {
      login,
      updateProfileName,
      register,
    }
  );
}

export default useFetch;
