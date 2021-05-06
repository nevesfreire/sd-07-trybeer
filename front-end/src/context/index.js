import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

const Provider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  function addToCart(product) {
    if (cart.find(({ id }) => id === product.id)) {
      setCart((prevCart) => prevCart.map((prod) => {
        if (prod.id === product.id) prod.quantity += 1;
        return prod;
      }));
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  }

  function removeFromCart(product) {
    if (!cart.find(({ id }) => id === product.id)) return;

    const newCart = cart.map((prod) => {
      if (prod.id === product.id) prod.quantity -= 1;
      return prod;
    });

    setCart(newCart.filter(({ quantity }) => quantity > 0));
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
