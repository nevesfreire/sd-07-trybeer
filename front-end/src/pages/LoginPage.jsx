import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import { MainContainer } from '../styled/FormStyle.styled';

function Login({ history }) {
  return (
    <MainContainer>
      <Form history={ history } />
    </MainContainer>
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
