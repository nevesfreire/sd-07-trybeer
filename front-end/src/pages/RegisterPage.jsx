import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import { MainContainer } from '../styled/FormStyle.styled';
import Title from '../styled/Title.styled';

function Register({ history }) {
  return (
    <MainContainer>
      <Title>💻 CodeBeer 🍻</Title>
      <Form history={ history } />
    </MainContainer>
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
