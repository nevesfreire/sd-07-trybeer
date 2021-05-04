import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

export default function Login() {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  if (shouldRedirect) {
    return <Redirect to="/home" />;
  }

  return (
    <div>

      <label htmlFor="email">
        Email:
        <input
          id="email"
          name="email"
          type="text"
          data-testid="email-input"
        />
      </label>

      <label htmlFor="password">
        Password:
        <input
          id="password"
          name="password"
          type="password"
          data-testid="password-input"
        />
      </label>

      <button
        type="button"
        data-testId="signin-btn"
        onClick={ () => setShouldRedirect(true) }
      >
        Entrar
      </button>

      <Link
        to="/register"
        data-testId="no-account-btn"
      >
        Ainda não tenho conta
      </Link>
    </div>
  );
}
