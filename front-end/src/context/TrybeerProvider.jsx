import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TrybeerContext from './TrybeerContext';

const updateTotalValue = () => {
  const cartResult = localStorage.getItem('TotalValue');
  return Number(cartResult);
};

const updatedOrderValue = () => {
  const orderResult = JSON.parse(localStorage.getItem('products'));
  if (orderResult === null) return [];
  return orderResult;
};

function TrybeerProvider({ children }) {
  const [order, setOrder] = useState(updatedOrderValue());
  const [totalValue, setTotalValue] = useState(updateTotalValue());

  const addInCart = (id, price, quantity) => {
    const updatedOrder = order.filter((object) => object.id !== id);
    setOrder([...updatedOrder, { id, quantity: quantity + 1 }]);
    setTotalValue(totalValue + Number(price));
  };

  const removeFromCart = (id, price) => {
    setTotalValue(totalValue - Number(price));
    const findById = order.find((product) => id === product.id);

    if (findById.quantity <= 1) {
      const updatedOrder = order.filter((product) => product.id !== id);

      return setOrder(updatedOrder);
    }

    const updatedOrder = order.map((product) => {
      if (product.id === id) {
        return { id, quantity: product.quantity - 1 };
      }
      return product;
    });
    return setOrder(updatedOrder);
  };

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(order));
    localStorage.setItem('TotalValue', totalValue);
  }, [order]);

  const context = {
    addInCart,
    removeFromCart,
    totalValue,
    setTotalValue,
  };

  return (
    <main>
      <TrybeerContext.Provider value={ context }>
        {children}
      </TrybeerContext.Provider>
    </main>
  );
}

TrybeerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TrybeerProvider;
