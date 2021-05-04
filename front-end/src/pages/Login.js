import React from 'react';
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

export default Login;
