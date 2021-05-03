import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const BeerContext = createContext();

const BeerProvider = ({ children }) => {
  const [login, setLogin] = useState(false);

  const context = {
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
