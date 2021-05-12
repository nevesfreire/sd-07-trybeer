import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';

function Register({ history }) {
  return (
    <Form history={ history } />
  );
}

Register.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Register;
