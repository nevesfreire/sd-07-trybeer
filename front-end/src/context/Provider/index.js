import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BeerContext from '../BeerContext';

export default function Provider({ children }) {
  const [productsCart, setProductsCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);

  // productList = [
  //   { name: 'skol',
  //     quantity: 2,
  //     totalPrice: 2 * price,
  //   },
  // ];

  const context = {
    productsCart,
    setProductsCart,
    totalCart,
    setTotalCart,
  };
  return (
    <BeerContext.Provider value={ context }>
      {children}
    </BeerContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};
