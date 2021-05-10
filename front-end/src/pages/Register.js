import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { fetchs, localStorage, validate } from '../functions-hooks';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errorMenssage, setErrorMenssage] = useState({ error: false, menssage: '' });
  const [role, setRole] = useState('');
  const { validateName, validateEmail, validatePassword } = validate;

  const buttonRegister = async () => {
    const { fetchAPI } = fetchs;
    const obj = { name, email, password, role: isChecked };
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

      <h4 style={ { visibility: (errorMenssage.error ? 'visible' : 'hidden') } }>
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
