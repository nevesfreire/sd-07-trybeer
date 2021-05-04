import React, { useState } from 'react';
import Validator from 'email-validator';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import loginUser from '../services/user';

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { history: { push } } = props;

  const validateLogin = () => {
    const passwordLength = 6;
    return (Validator.validate(email) && password.length >= passwordLength);
  };

  const login = async () => {
    const result = await loginUser(email, password);
    localStorage.setItem('token', JSON.stringify(result));
    if (result.role === 'admin') {
      push('/admin');
    }

    return result;
  };

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
        onClick={ login() }
      >
        Entrar
      </button>
      <Link to="/register" data-testid="no-account-btn">Ainda não tenho conta</Link>
    </form>);
};

LoginForm.propTypes = {
  history: PropTypes.objectOf().isRequired,
};

export default withRouter(LoginForm);
