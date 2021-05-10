import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import TextInput from '../../commons/composed/TextInput';

import { registerNewUser } from '../../services/usersApi';

function Register({ history }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsCheked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyUserData = () => {
      const minNameLength = 12;
      const minLength = 6;
      const onlyLetters = /^[a-zA-Z]*$/.test(...name.split(' '));

      const regex = /\S+@\S+\.\S+/;
      if (regex.test(email)
        && password.length >= minLength
        && (name.length >= minNameLength && onlyLetters)) setIsDisabled(false);
      else setIsDisabled(true);
    };
    verifyUserData();
  }, [name, email, password]);

  async function onRegisterNewUser() {
    const success = 200;
    const { status, data } = await registerNewUser(
      name, email, password, isChecked ? 'admin' : 'client',
    );

    if (status === success && isChecked) {
      return history.push('/login');
    } if (status === success && !isChecked) {
      return history.push('/products');
    }
    setError(true);
    setErrorMessage(data.message);
  }

  return (
    <>
      <h1>register</h1>
      { error && <span>{ errorMessage }</span> }
      <div>
        <TextInput
          textLabel="Nome"
          type="text"
          name="name"
          value={ name }
          placeholder="digite seu nome"
          dataTestId="signup-name"
          setValue={ setName }
        />
        <TextInput
          textLabel="Email"
          type="email"
          name="email"
          value={ email }
          placeholder="digite seu email"
          dataTestId="signup-email"
          setValue={ setEmail }
        />
        <TextInput
          textLabel="Senha"
          type="password"
          name="password"
          value={ password }
          placeholder="digite sua senha"
          dataTestId="signup-password"
          setValue={ setPassword }
        />
        <label htmlFor="signup-seller">
          Quero vender
          <input
            type="checkbox"
            checked={ isChecked }
            onChange={ () => setIsCheked(!isChecked) }
            data-testid="signup-seller"
          />
        </label>

        <button
          type="button"
          data-testid="signup-btn"
          disabled={ isDisabled }
          onClick={ onRegisterNewUser }
        >
          Cadastrar
        </button>
      </div>
    </>
  );
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(Register);
