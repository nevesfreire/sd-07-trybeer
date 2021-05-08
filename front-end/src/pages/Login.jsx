import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { fetchs, localStorage } from '../functions-hooks';

function validateEmail(email) {
  const regex = new RegExp([
    /^[-!#$%&'*+\\/0-9=?A-Z^_a-z{|}~]/,
    /(\.?[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~])*/,
    /@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
  ].map((r) => r.source).join(''));
  return regex.test(email);
}

function validatePassword(password) {
  const minimumSize = 6;
  return minimumSize <= password.length;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMenssage, setErrorMenssage] = useState({ error: false, menssage: '' });
  const [role, setRole] = useState('');

  const buttonLogin = async () => {
    const { fetchAPI } = fetchs;
    const obj = { email, password };
    const api = await fetchAPI('/login', 'POST', obj);
    if (api.error) return setErrorMenssage({ error: true, menssage: api.message });
    localStorage.setItem('user', api.user);
    setRole(api.user.role);
  };

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

      <h4 visibility={ errorMenssage.error ? 'visible' : 'hidden' }>
        {errorMenssage.menssage}
      </h4>

      <button
        data-testid="signin-btn"
        disabled={ !validateEmail(email) || !validatePassword(password) }
        onClick={ buttonLogin }
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

      {(role === 'administrator') && <Redirect to="/admin/orders" />}
      {(role === 'client') && <Redirect to="/products" />}

    </div>
  );
}
