import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { isAuthenticated } from './services/localStorage';

function ProtectedRoute({ children, ...rest }) {
  return (
    <Route
      { ...rest }
      render={ () => (isAuthenticated() ? children : <Redirect to="/login" />) }
    />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
