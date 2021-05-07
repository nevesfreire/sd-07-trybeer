import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const BeerContext = createContext();

const BeerProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [cart, setCart] = useState({ 0: { product: { value: 0 }, quantity: 0 } });

  const context = {
    cart,
    setCart,
    login,
    setLogin,
  };

  return (
    <BeerContext.Provider value={ context }>
      { children }
    </BeerContext.Provider>
  );
};

BeerProvider.propTypes = {
  children: PropTypes.objectOf().isRequired,
};

export { BeerContext, BeerProvider as Provider };
