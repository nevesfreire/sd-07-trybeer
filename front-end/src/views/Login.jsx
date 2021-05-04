import React from 'react';
import { Link } from 'react-router-dom';
import { useValideEmailAndPassword } from '../hooks';

export default function Login() {
  const [isEmailValid, setUser] = useValideEmailAndPassword();
  console.log(isEmailValid);
  return (
    <div>
      <label htmlFor="email">
        Email
        <input
          data-testid="email-input"
          type="email"
          id="email"
          onChange={ (e) => setUser(e) }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          data-testid="password-input"
          type="password"
          id="password"
          onChange={ (e) => setUser(e) }
        />
      </label>

      <button
        data-testid="signin-btn"
        type="button"
        disabled={ !isEmailValid }
      >
        Entrar

      </button>

      <Link data-testid="no-account-btn" to="/register">Ainda nao tenho conta</Link>

    </div>
  );
}
