import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { ClientReducer } from './ClientReducer';
import ClientContext from './ClientContext';

const initialState = { isHiddenMenu: false };

export default function ClientProvider({ children }) {
  const [clientState, dispatch] = useReducer(ClientReducer, initialState);

  return (
    <ClientContext.Provider value={ { dispatch, clientState } }>
      {children}
    </ClientContext.Provider>
  );
}

ClientProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
