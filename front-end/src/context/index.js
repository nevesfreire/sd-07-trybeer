import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

const Provider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const contextValue = {
    menuOpen,
    setMenuOpen,
  };
  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Context, Provider };
