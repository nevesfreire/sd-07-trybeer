import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import FormLogin from '../../component/FormLogin';
import LoginWrapper from './styles';

function Login() {  
  const history = useHistory();

  return (
    <LoginWrapper>
      <FormLogin />
      <button 
        id="btn_new_user"
        type="button" 
        onClick={() => { history.push('/register')}}
        data-testid="no-account-btn"
      >
        Ainda não tenho conta
      </button>
    </LoginWrapper>
  );
}

export default Login;
