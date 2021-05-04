import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const valuesProvided = {
    email,
    setEmail,
    password,
    setPassword,
  };

  return (
    <Context.Provider value={ valuesProvided }>
      { children }
    </Context.Provider>
  );
}

export default Provider;
