// import axios from 'axios';
// import { useContext } from 'react';
// import TrybeerContext from '../context/TrybeerContext';

const informationType = 'application/json';

function useFetch() {
  async function login(email, password) {
    const result = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        Accept: informationType,
        'Content-Type': informationType,
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await result.json();
    console.log('data', data);
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
    }
  );
}

export default useFetch;
