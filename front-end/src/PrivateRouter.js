import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = () => localStorage.getItem('token');

const PrivateRouter = ({ component: Component, ...rest }) => (
  <Route
    { ...rest }
    render={ (props) => (isAuthenticated() ? (
      <Component { ...props } />
    ) : (
      <Redirect to={ { pathname: '/login', state: { from: props.location } } } />
    )) }
  />
);

PrivateRouter.propTypes = {
  component: PropTypes.element.isRequired,
  location: PropTypes.element.isRequired,
};

export default PrivateRouter;
