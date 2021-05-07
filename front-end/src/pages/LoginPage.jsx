import React from 'react';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from '../components/Form';

function Login({ history }) {
  return (
    <Form history={ history } />
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Login;
