import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { saveItem, getItem } from '../services/localStorage';

const Context = createContext();

const Provider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (getItem('cart')) setCart(getItem('cart'));
  }, []);

  function addToCart(product) {
    if (cart.find(({ id }) => id === product.id)) {
      setCart((prevCart) => prevCart.map((prod) => {
        if (prod.id === product.id) prod.quantity += 1;
        return prod;
      }));
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }

    saveItem('cart', cart);
  }

  function removeFromCart(product) {
    if (!cart.find(({ id }) => id === product.id)) return;

    const newCart = cart.map((prod) => {
      if (prod.id === product.id) prod.quantity -= 1;
      return prod;
    });

    const filteredCart = newCart.filter(({ quantity }) => quantity > 0);
    saveItem('cart', filteredCart);
    setCart(filteredCart);
  }

  const contextValue = {
    menuOpen,
    setMenuOpen,
    cart,
    addToCart,
    removeFromCart,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Context, Provider };
