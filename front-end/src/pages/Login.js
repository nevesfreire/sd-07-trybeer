import React from 'react';
import PropTypes from 'prop-types';
import LoginInputs from '../components/LoginInputs';

function Login(props) {
  const { history } = props;
  return (
    <>
      <LoginInputs />
      <button
        data-testid="signin-btn"
        type="button"
        onClick={ () => history.push('/products') }
      >
        Entrar
      </button>
      <button
        data-testid="no-account-btn"
        type="button"
        onClick={ () => history.push('/register') }
      >
        Ainda não tenho conta
      </button>
    </>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
