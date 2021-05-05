import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import login from '../../service/trybeerApi';

export default function Login() {
  const [shouldRedirect, setShouldRedirect] = useState('');
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const verifyInput = () => {
    const { email, password } = loginInfo;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordMinLength = 6;
    const validPassword = password.length >= passwordMinLength;
    console.log(validEmail && validPassword);
    return validEmail && validPassword;
  };

  const handleChange = ({ target: { name, value } }) => {
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleClick = () => {
    const { email, password } = loginInfo;
    const result = login(email, password);
    setShouldRedirect(result.role);
  };

  if (shouldRedirect) {
    return (<Redirect
      to={ `/${shouldRedirect === 'administrator' ? 'home' : 'produtos'}` }
    />);
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
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="password">
        Password:
        <input
          id="password"
          name="password"
          type="password"
          onChange={ handleChange }
          data-testid="password-input"
        />
      </label>

      <button
        type="button"
        data-testid="signin-btn"
        disabled={ !verifyInput() }
        onClick={ handleClick }
      >
        Entrar
      </button>

      <Link
        to="/register"
        data-testid="no-account-btn"
      >
        Ainda não tenho conta
      </Link>
    </div>
  );
}
