import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TrybeerContext from './TrybeerContext';

export default function Provider({ children }) {
  const [state, setstate] = useState('');

  const context = {
    state,
    setstate,
  };

  return (
    <TrybeerContext.Provider
      value={ context }
    >
      {children}
    </TrybeerContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
