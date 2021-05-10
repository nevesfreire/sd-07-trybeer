import React from 'react';
import PropTypes from 'prop-types';
import trybeerContext from './TrybeerContext';

function Provider({ children }) {
  const valueProvider = {
  };

  return (
    <trybeerContext.Provider value={ valueProvider }>
      {children}
    </trybeerContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
