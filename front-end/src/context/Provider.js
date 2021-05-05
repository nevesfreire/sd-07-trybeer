import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('client');
  const [pageTitle, setPageTitle] = useState('TryBeer');
  const [sideIsActive, setSideIsActive] = useState(false);

  const valuesProvided = {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    role,
    setRole,
    pageTitle,
    setPageTitle,
    sideIsActive,
    setSideIsActive,
  };

  return (
    <Context.Provider value={ valuesProvided }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
