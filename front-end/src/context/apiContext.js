import React from 'react';
import Proptypes from 'prop-types';
import ApiContext from './context';
// import api from '../components/api/config';
// import auth from '../components/auth'

function ApiProvider({ children }) {
  const userLogin = ({ email, password }) => fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((request) => request.json())
    .then((response) => {
      const results = response;
      return results;
    })
    .catch((err) => {
      console.error(err);
    });

  const data = { userLogin };

  return (
    <ApiContext.Provider value={ data }>
      { children }
    </ApiContext.Provider>
  );
}

export default ApiProvider;

ApiProvider.propTypes = {
  children: Proptypes.node.isRequired,
};
