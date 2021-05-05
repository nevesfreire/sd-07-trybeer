import React, { useState } from 'react';
import Validator from 'email-validator';
import { useHistory } from 'react-router';
// import { Link } from 'react-router-dom';
import { registerUser } from '../services/Api/user';
import LoginAuth from '../services/Auth/Login';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [seller, setSeller] = useState(false);
  const [showError, setShowError] = useState(false);
  const { push } = useHistory();

  const cadastrar = async (e) => {
    e.preventDefault();
    const role = seller ? 'administrator' : 'client';
    const user = await registerUser(name, email, role, password);
    if (user.error) {
      setShowError(true);
    } else {
      LoginAuth(e, email, password, push);
    }

    return user;
  };

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
      {showError && <p>Já existe um usuário com esse e-mail.</p>}
    </form>);
};
export default LoginForm;
