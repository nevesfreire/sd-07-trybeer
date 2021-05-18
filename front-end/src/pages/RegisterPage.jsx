import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import MainContainer from '../styled/FormStyle.styled';

function Register({ history }) {
  return (
    <MainContainer>
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
