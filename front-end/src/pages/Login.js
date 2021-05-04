import React from 'react';
/* import { getToken } from '../services/Login'; */

export default function Login() {
  const handleChange = () => null;

  const handleClick = (event) => {
    event.preventDefault();
    return null;
  };

  return (
    <div>
      <form onSubmit={ (event) => handleClick(event) }>
        <input
          name="email"
          data-testid="email-input"
          type="email"
          onChange={ handleChange }
        />
        <input
          name="password"
          data-testid="password-input"
          type="password"
          onChange={ handleChange }
        />
        <button
          data-testid="login-submit-btn"
          type="submit"
          /* disabled={ disabled } */
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
