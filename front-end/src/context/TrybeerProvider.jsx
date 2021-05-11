import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TrybeerContext from './TrybeerContext';

function TrybeerProvider({ children }) {
  const [order, setOrder] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

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
    
  }, [order]);

  const context = {
    addInCart,
    removeFromCart,
    totalValue,
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
