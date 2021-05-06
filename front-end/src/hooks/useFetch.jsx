import axios from 'axios';
// import { useContext } from 'react';
// import TrybeerContext from '../context/TrybeerContext';

function useFetch() {
  async function login(email, password) {
    const result = await axios.post('https://localhost:3001/login', { email, password });
    console.log('result', result);
    return result;
  }

  return (
    { login }
  );
}

export default useFetch;
