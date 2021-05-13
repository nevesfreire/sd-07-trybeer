import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { globalReducer } from './globalReducer';
import GlobalContext from './GlobalContext';

const INITIAL_STATE = {
  products: [],
  orders: [],
  sales: [],
  isUserValid: true,
};

export default function GlobalProvider({ children }) {
  const [productState, productsDispatch] = useReducer(globalReducer, INITIAL_STATE);
  const [storage, setStorage] = useState({});
  return (
    <GlobalContext.Provider
      value={ { productsDispatch, productState, storage, setStorage } }
    >
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.shape(PropTypes.element.isRequired).isRequired,
};
