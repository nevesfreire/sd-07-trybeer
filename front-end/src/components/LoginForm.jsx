import React, { useState } from 'react';
import Validator from 'email-validator';
import { Link, useHistory } from 'react-router-dom';
import LoginAuth from '../services/Auth/Login';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { push } = useHistory();

  const validateLogin = () => {
    const passwordLength = 6;
    return (Validator.validate(email) && password.length >= passwordLength);
  };

  // if (redirect !== '') {
  //   return <Redirect to={ redirect } />;
  // }

  return (
    <form>
      <label htmlFor>
        Email
        <input
          data-testid="email-input"
          type="email"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
      </label>
      <label htmlFor>
        Senha
        <input
          data-testid="password-input"
          type="password"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
      </label>
      <button
        data-testid="signin-btn"
        type="submit"
        disabled={ !validateLogin() }
        onClick={ (e) => LoginAuth(e, email, password, push) }
      >
        Entrar
      </button>
      <Link to="/register" data-testid="no-account-btn">Ainda não tenho conta</Link>
    </form>);
};

export default LoginForm;
