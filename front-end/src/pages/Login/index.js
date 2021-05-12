import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import FormLogin from '../../component/FormLogin';
import LoginWrapper from './styles';

function Login() {

  const redirectToRegister = () => {    
    return <Redirect to="/register" />
  }

  return (
    <LoginWrapper>
      <FormLogin />
      <Link
        id="btn_new_user"
        type="button"        
        data-testid="no-account-btn"
        to="/register"
      >
        Ainda não tenho conta
      </Link>
    </LoginWrapper>
  );
}

export default Login;
