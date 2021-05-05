import React, { useState } from 'react';
import Validator from 'email-validator';
// import { Link } from 'react-router-dom';
import {registerUser} from '../services/user';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [seller, setSeller] = useState(false);

  const cadastrar = async (e) => {
    e.preventDefault()
    const role = seller ? 'admin' : 'user';
    const user = await registerUser(name, email, role, password);

    console.log(user);
    return user;
  };

  // const redirect = async () => {

  // };

  const validateLogin = () => {
    const passwordLength = 6;
    const nameLength = 12;
    const regexNameValidation = /^[a-z ,.'-]+$/i;

    return (
      Validator.validate(email)
      && password.length >= passwordLength
      && name.length >= nameLength
      && regexNameValidation.test(name)
    );
  };

  return (
    <form>
      <label htmlFor="name">
        Nome
        <input
          id="name"
          data-testid="signup-name"
          type="text"
          value={ name }
          onChange={ ({ target: { value } }) => setName(value) }
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          id="email"
          data-testid="signup-email"
          type="email"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          id="password"
          data-testid="signup-password"
          type="password"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
      </label>
      <label htmlFor="checkbox">
        Quero vender
        <input
          id="checkbox"
          name="querVender"
          data-testid="signup-seller"
          type="checkbox"
          checked={ seller }
          onClick={ () => setSeller(!seller) }
        />
      </label>
      <button
        data-testid="signup-btn"
        type="submit"
        disabled={ !validateLogin() }
        onClick={ (e) => cadastrar(e) }
      >
        Cadastrar
      </button>
    </form>);
};
export default LoginForm;
