import axios from 'axios';
import React, { createContext, useState } from 'react';
import api from '../components/api/config';
// import auth from '../components/auth'

const ApiContext = createContext();

export default ApiContext;

export const ApiProvider = ({ children }) => {
  const [user, setUser] = useState('hahay');

  const userLogin = async ({ email, password }) => {
    const options = {
      method: 'POST',
      url: 'http://localhost:3001/login',
      headers: { 'Content-Type': 'application/json' },
      data: { email, password },
    };

    return axios.request(options).then((response) => {
      const { data } = response;
      return data;
    }).catch(({ err }) => {
      console.error(err);
    });
  };

  const data = { userLogin };

  return (
    <ApiContext.Provider value={ data }>
      { children }
    </ApiContext.Provider>
  );
};
