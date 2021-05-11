import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { globalReducer } from './globalReducer';
import GlobalContext from './GlobalContext';

const productsInitialState = {
  products: [],
};

export default function GlobalProvider({ children }) {
  const [products, productsDispatch] = useReducer(globalReducer, productsInitialState);
  return (
    <GlobalContext.Provider value={ { productsDispatch, products } }>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.shape(PropTypes.element.isRequired).isRequired,
};
