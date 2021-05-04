import React from 'react';
import PropTypes from 'prop-types';
import BeerAppContext from './BeerAppContext';

function Provider({ children }) {
  return (
    <BeerAppContext.Provider>
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
