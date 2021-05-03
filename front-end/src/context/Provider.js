import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TryBeerContext from './TryBeerContext';

function Provider({ children }) {
  const [data, setData] = useState([]);

  const context = {
    data,
    setData,
  };

  return (
    <TryBeerContext.Provider value={ context }>
      {children}
    </TryBeerContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
