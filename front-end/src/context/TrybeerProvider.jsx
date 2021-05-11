import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TrybeerContext from './TrybeerContext';

function TrybeerProvider({ children }) {
  const [order, setOrder] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const addInCart = (id, name, price) => {
    const filteredProduct = order.filter((product) => id === product.id);
    setOrder([...order, { id, name, price }]);
    setTotalValue(totalValue + price);
  };

  const removeFromCart = (name, price) => {

  };

  const getQuantity = (name) => {

  };

  const context = {
    addOrder,
    addInCart,
    removeFromCart,
    getQuantity,
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
