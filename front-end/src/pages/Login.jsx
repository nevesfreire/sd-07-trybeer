import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
  return regex.test(email);
}

function validatePassword(password) {
  const minimumSize = 6;
  return minimumSize <= password.length;
}

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div>

      <label htmlFor="emailLogin">

        <h3>Email</h3>

        <input
          data-testid="email-input"
          id="emailLogin"
          name="email"
          onChange={ ({ target: { value } }) => setEmail(value) }
          type="email"
          value={ email }
        />

      </label>

      <label htmlFor="passwordLogin">

        <h3>Senha</h3>

        <input
          data-testid="password-input"
          id="passwordLogin"
          name="password"
          onChange={ ({ target: { value } }) => setPassword(value) }
          type="password"
          value={ password }
        />
      </label>

      <button
        data-testid="signin-btn"
        disabled={ !validateEmail(email) || !validatePassword(password) }
        onClick={ () => history.push('/products') }
        type="button"
      >
        Entrar
      </button>

      <Link
        data-testid="no-account-btn"
        to="/register"
      >
        Ainda não tenho conta
      </Link>

    </div>
  );
}
