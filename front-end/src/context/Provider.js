import React from 'react';
import BeerContext from './beerContext';

function Provider({ children }) {
  // setar funções
  const valueProvider = {
    // funções a serem passadas
  }
  return (
    <BeerContext.Provider value={valueProvider}>
      {children}
    </BeerContext.Provider>
  );
}

export default Provider;