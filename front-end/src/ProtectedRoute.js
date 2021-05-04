import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute(props) {
  const isAuth = () => true;

  return isAuth()
    ? <Route { ...props } />
    : <Redirect to={ redirect } />;
}

export default ProtectedRoute;
