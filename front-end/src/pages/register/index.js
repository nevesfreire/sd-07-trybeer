import React, { useState } from 'react';

export default function Register() {
  const [shouldRedirect, setShouldRedirect] = useState('');
  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const verifyInput = () => {
    const { name, email, password } = registerInfo;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordMinLength = 6;
    const nameMinLength = 12;
    const validName = name.length >= nameMinLength
    && /^[a-z ]+$/i.test(name);
    const validPassword = password.length >= passwordMinLength;
    return validEmail && validPassword && validName;
  };

  const handleChange = ({ target: { name, value } }) => {
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  };

  const handleClick = async () => {
    setShouldRedirect(true);
  };

  return (
    <div>

      <label htmlFor="name">
        Nome:
        <input
          id="name"
          name="name"
          type="text"
          data-testid="signup-name"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="email">
        Email:
        <input
          id="email"
          name="email"
          type="text"
          data-testid="signup-email"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="password">
        Password:
        <input
          id="password"
          name="password"
          type="password"
          data-testid="signup-password"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="seller">
        <input
          id="seller"
          name="seller"
          type="checkbox"
          data-testid="signup-seller"
          onChange={ handleChange }
        />
        Quero Vender
      </label>

      <button
        type="button"
        data-testid="signup-btn"
        disabled={ !verifyInput() }
        onClick={ handleClick }
      >
        Cadastrar
      </button>
    </div>
  );
}
