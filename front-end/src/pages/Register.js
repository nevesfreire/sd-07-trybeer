import React, { useState } from 'react';
import { useHistory } from 'react-router';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role }),
    }).then(role === 'client'
      ? history.push('/products') : history.push('/admin/orders'));
  };

  const minName = 12;
  const validateName = () => {
    const regexName = /^[a-z\s]+$/i;
    return name && name.length >= minName && regexName.test(name);
  };

  const validateEmail = () => {
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return email && regexEmail.test(email);
  };

  const minPassword = 6;
  const validatePassword = () => password && password.length >= minPassword;

  const isDisabled = () => !validateName() || !validateEmail() || !validatePassword();

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="signup-name">
        Nome
        <input
          id="signup-name"
          data-testid="signup-name"
          type="text"
          onChange={ (e) => setName(e.target.value) }
        />
      </label>
      <label htmlFor="signup-email">
        Email
        <input
          id="signup-email"
          data-testid="signup-email"
          type="email"
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="signup-password">
        Senha
        <input
          id="signup-password"
          data-testid="signup-password"
          type="password"
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <label htmlFor="signup-seller">
        Quero vender
        <input
          id="signup-seller"
          data-testid="signup-seller"
          type="checkbox"
          onChange={ (e) => setRole(e.target.checked === true
            ? 'administrator' : 'client') }
        />
      </label>
      <button
        data-testid="signup-btn"
        type="submit"
        disabled={ isDisabled() }
      >
        Cadastrar
      </button>
    </form>
  );
}

export default Register;
