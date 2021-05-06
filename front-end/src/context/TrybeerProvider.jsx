import React from 'react';
import PropTypes from 'prop-types';
import TrybeerContext from './TrybeerContext';

function TrybeerProvider({ children }) {
  const context = {
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
