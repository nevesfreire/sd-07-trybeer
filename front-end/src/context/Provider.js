import React from 'react';
import PropTypes from 'prop-types';
import BeerContext from './beerContext';

function Provider({ children }) {
  // setar funções
  const valueProvider = {
    // funções a serem passadas
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
