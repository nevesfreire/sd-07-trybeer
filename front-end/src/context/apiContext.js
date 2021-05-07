import React, { createContext } from 'react';
import Proptypes from 'prop-types';
// import api from '../components/api/config';
// import auth from '../components/auth'

const ApiContext = createContext();

export default ApiContext;

export const ApiProvider = ({ children }) => {
  const userLogin = ({ email, password }) => fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((request) => request.json())
    .then((response) => {
      const data = response;
      return data;
    })
    .catch((err) => {
      console.error(err);
    });

  const userRegister = ({ name, email, password, role }) => fetch('http://localhost:3001/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
      role,
    }),
  })
    .then((request) => request.json())
    .then((response) => {
      const data = response;
      return data;
    })
    .catch((err) => {
      console.error(err);
    });

  const data = {
    userLogin,
    userRegister,
  };

  console.log('data context', data);

  return (
    <ApiContext.Provider value={ data }>
      { children }
    </ApiContext.Provider>
  );
};

ApiProvider.propTypes = {
  children: Proptypes.node.isRequired,
};
