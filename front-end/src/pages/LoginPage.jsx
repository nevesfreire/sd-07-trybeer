import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import { MainContainer } from '../styled/FormStyle.styled';
import Title from '../styled/Title.styled';

function Login({ history }) {
  return (
    <MainContainer>
      <Title>💻 CodeBeer 🍻</Title>
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
