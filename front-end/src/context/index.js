import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

const Provider = ({ children }) => (
  <Context.Provider value={ {} }>
    {children}
  </Context.Provider>
);

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default { Context, Provider };
