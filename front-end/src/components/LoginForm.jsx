import React, { useState } from 'react';
import Validator from 'email-validator';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../services/user';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const validateLogin = () => {
    const passwordLength = 6;
    return (Validator.validate(email) && password.length >= passwordLength);
  };

  const login = async () => {
    const {
      token,
      name,
      role,
      email: emailResponse,
      message,
    } = await loginUser(email, password);

    // console.log(result);
    if (message) {
      console.log(message);
    }

    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('name', JSON.stringify(name));
    localStorage.setItem('role', JSON.stringify(role));
    localStorage.setItem('email', JSON.stringify(emailResponse));

    if (role === 'admin') {
      history.push('/admin/profile');
      // console.log('push');
    }
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
        onClick={ () => login() }
      >
        Entrar
      </button>
      <Link to="/register" data-testid="no-account-btn">Ainda não tenho conta</Link>
    </form>);
};

export default LoginForm;
