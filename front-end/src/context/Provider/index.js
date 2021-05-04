import React from 'react';
import PropTypes from 'prop-types';
import BeerContext from '../BeerContext';

export default function Provider({ children }) {
  const context = {

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
