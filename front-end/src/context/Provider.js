import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BeerContext from './beerContext';

function Provider({ children }) {
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [role, setRole] = useState('');
  const [cartPreview, setCartPreview] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);

  const valueProvider = {
    isFetching,
    setIsFetching,
    products,
    setProducts,
    email,
    setEmail,
    password,
    setPassword,
    isDisable,
    setIsDisable,
    errorMessage,
    setErrorMessage,
    role,
    setRole,
    cartPreview,
    setCartPreview,
    cartQuantity,
    setCartQuantity,
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
