import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BeerContext from './beerContext';

function Provider({ children }) {
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [role, setRole] = useState('');

  const valueProvider = {
    isFetching,
    products,
    setIsFetching,
    setProducts,
    email,
    setEmail,
    password,
    setPassword,
    isDisable,
    setIsDisable,
    isLogged,
    setIsLogged,
    errorMessage,
    setErrorMessage,
    role,
    setRole,
  };
  return (
    <BeerContext.Provider value={ valueProvider }>
      {children}
    </BeerContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
