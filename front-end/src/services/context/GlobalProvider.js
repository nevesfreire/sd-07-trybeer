import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { globalReducer } from './globalReducer';
import GlobalContext from './GlobalContext';

const INITIAL_STATE = {
  products: [],
};

export default function GlobalProvider({ children }) {
  const [productState, productsDispatch] = useReducer(globalReducer, INITIAL_STATE);
  return (
    <GlobalContext.Provider value={ { productsDispatch, productState } }>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.shape(PropTypes.element.isRequired).isRequired,
};
