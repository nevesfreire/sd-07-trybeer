import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TrybeerContext from './TrybeerContext';

function TrybeerProvider({ children }) {
  const getCart = JSON.parse(localStorage.getItem('cart'));
  const [products, setProducts] = useState(getCart);
  const [forSales, setForSales] = useState([]);
  const [shopCart, setShopCart] = useState([]);
  const [amount, setAmount] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState(false);

  useEffect(() => {
    if (products) {
      const total = products
        .reduce((acc, { quantity, price }) => acc + (quantity * price), 0);
      setAmount(total);

      localStorage.setItem('amount', JSON.stringify(total));
      localStorage.setItem('cart', JSON.stringify(products));
    }
  }, [products]);

  const context = {
    products,
    amount,
    setAmount,
    loggedInUser,
    setLoggedInUser,
    shopCart,
    setShopCart,
    forSales,
    setForSales,
    setProducts };

  return (
    <TrybeerContext.Provider value={ context }>
      { children }
    </TrybeerContext.Provider>
  );
}

export { TrybeerContext, TrybeerProvider as Provider };

TrybeerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
