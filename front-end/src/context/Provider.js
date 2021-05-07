import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BeerContext from './beerContext';

function Provider({ children }) {
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const valueProvider = {
    isFetching,
    products,
    setIsFetching,
    setProducts,
  };
  return (
    <BeerContext.Provider value={ valueProvider }>
      {children}
    </BeerContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
