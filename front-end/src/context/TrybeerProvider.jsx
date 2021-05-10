import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TrybeerContext from './TrybeerContext';

function TrybeerProvider({ children }) {
  const [order, setOrder] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const addOrder = (product) => {
    order.push(product);
    setTotalValue(totalValue + product.price);
  }
  const context = {
    addOrder,
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
