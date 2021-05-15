import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userLogin } from '../../services/apiService';
import validateLogin from './validationLogin';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onSubmitHandler = async (e, user) => {
    e.preventDefault();

    // req da api enviando:
    const response = await userLogin(user).then((apiResponse) => apiResponse);
    if (await response.role === 'administrator') {
      localStorage.setItem('user', JSON.stringify(response));
      history.push('/admin/orders');
    }
    if (await response.role === 'client') {
      localStorage.setItem('user', JSON.stringify(response));
      history.push('/products');
    }
  };

  return (
    <form>
      <label htmlFor="email-input">
        Email
        <input
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          placeholder="Email address"
          type="email"
          name="email"
          data-testid="email-input"
          required
        />
      </label>
      <label htmlFor="password-input">
        <span>Senha</span>
        <input
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          placeholder="Password"
          type="password"
          name="password"
          data-testid="password-input"
          required
        />
      </label>
      <button
        type="submit"
        data-testid="signin-btn"
        disabled={ validateLogin(email, password) }
        onClick={ (e) => onSubmitHandler(e, { email, password }) }
      >
        Entrar
      </button>
      <Link
        to="/register"
        data-testid="no-account-btn"
      >
        Ainda não tenho conta
      </Link>
    </form>
  );
}

export default LoginForm;
