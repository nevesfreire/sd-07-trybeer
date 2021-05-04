import React from 'react';

export default function Login() {
  const handleChange = () => {
  };

  const handleClick = () => {
  };

  return (
    <div>
      <form>
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
          type="button"
/*           disabled={ disabled } */
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
