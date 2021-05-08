import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { fetchs, localStorage } from '../functions-hooks';

function validateName(name) {
  const regex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  const minimumSize = 12;
  return (regex.test(name) && name.length >= minimumSize);
}

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

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errorMenssage, setErrorMenssage] = useState({ error: false, menssage: '' });
  const [role, setRole] = useState('');

  const buttonRegister = async () => {
    const { fetchAPI } = fetchs;
    const obj = { name, email, password, isChecked };
    const api = await fetchAPI('/register', 'POST', obj);
    if (api.error) return setErrorMenssage({ error: true, menssage: api.message });
    localStorage.setItem('user', api.user);
    setRole(api.user.role);
  };

  return (
    <div>
      <label htmlFor="nameRegister">

        <h3>Nome</h3>

        <input
          data-testid="signup-name"
          id="nameRegister"
          name="name"
          onChange={ ({ target: { value } }) => setName(value) }
          type="text"
          value={ name }
        />

      </label>

      <label htmlFor="emailRegister">

        <h3>Email</h3>

        <input
          data-testid="signup-email"
          id="emailRegister"
          name="email"
          onChange={ ({ target: { value } }) => setEmail(value) }
          type="email"
          value={ email }
        />

      </label>

      <label htmlFor="passwordRegister">

        <h3>Senha</h3>

        <input
          data-testid="signup-password"
          id="passwordRegister"
          name="password"
          onChange={ ({ target: { value } }) => setPassword(value) }
          type="password"
          value={ password }
        />
      </label>

      <div>
        <label htmlFor="checkboxRegister">

          Quero vender

          <input
            data-testid="signup-seller"
            checked={ isChecked }
            id="checkboxRegister"
            name="checkbox"
            onChange={ ({ target: { checked } }) => setIsChecked(checked) }
            type="checkbox"
          />

        </label>
      </div>

      <h4 visibility={ errorMenssage.error ? 'visible' : 'hidden' }>
        {errorMenssage.menssage}
      </h4>

      <button
        data-testid="signup-btn"
        disabled={
          !validateName(name) || !validateEmail(email) || !validatePassword(password)
        }
        onClick={ buttonRegister }
        type="button"
      >
        Cadastrar
      </button>

      {(role === 'administrator') && <Redirect to="/admin/orders" />}
      {(role === 'client') && <Redirect to="/products" />}

    </div>
  );
}
