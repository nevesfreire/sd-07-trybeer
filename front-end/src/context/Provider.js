import React, { useState, useReducer } from 'react';
import TrybeerContext from './TrybeerContext';

import useLocalStorage from '../hooks';

export default function Provider(props) {
  const [provideProps] = useState(props); // Props of Provide

  // ABOUT LOGIN | LOGOUT | AND USER
  const USER_KEY_LOCALSTORAGE = 'user';
  const [userLogged, setUserLogged] = useLocalStorage(USER_KEY_LOCALSTORAGE, {});
  const login = ({ user, name, email, token }) => setUserLogged(
    { user, name, email, token },
  );
  const logout = () => setUserLogged({});
  const userIsLogged = () => userLogged && Object.entries(userLogged).length !== 0;
  // ****************************************************************

  // ABOUT SHOPPING CART
  const CART_KEY_LOCALSTORAGE = 'cart';
  const [cartState, setCartState] = useLocalStorage(CART_KEY_LOCALSTORAGE, []);
  const shoppingCartReducer = (state, { type, payload }) => {
    switch (type) {
    case 'addProduct': {
      const newState = [...state];
      payload.quantity = 1;
      newState.push(payload);
      setCartState(newState);
      return newState;
    }
    case 'delProduct': {
      const newState = [...state].filter(({ id }) => id !== payload.id);
      setCartState(newState);
      return newState;
    }
    case 'incrementProduct': {
      const indexProduct = state.findIndex(({ id }) => id === payload.id);
      const newState = [...state];
      newState[indexProduct].quantity += 1;
      setCartState(newState);
      return newState;
    }
    case 'decrementProduct': {
      const indexProduct = state.findIndex(({ id }) => id === payload.id);
      const newState = [...state];
      newState[indexProduct].quantity -= 1;
      setCartState(newState);
      return newState;
    }
    default:
      throw new Error('Unexpected action');
    }
  };
  const [shoppingCart, dispatchShoppingCart] = useReducer(shoppingCartReducer, cartState);
  const getTotalShoppingCart = () => shoppingCart
    .reduce((sum, { quantity, price }) => sum + (parseFloat(price) * quantity), 0.0);
  // ****************************************************************
  const context = {
    userLogged,
    login,
    logout,
    userIsLogged,
    cartState,
    dispatchShoppingCart,
    getTotalShoppingCart,
  };

  const { children } = provideProps;

  return (
    <TrybeerContext.Provider
      value={ context }
    >
      {children}
    </TrybeerContext.Provider>
  );
}
