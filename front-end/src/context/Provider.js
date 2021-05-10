import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BeerAppContext from './BeerAppContext';

function Provider({ children }) {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const globalState = {
    totalProducts,
    setTotalProducts,
    products,
    setProducts,
  };

  return (
    <BeerAppContext.Provider value={globalState}>
      {children}
    </BeerAppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape({}),
};

Provider.defaultProps = {
  children: {},
};

export default Provider;
