import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import loginRequest from '../services/usersApi';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const verifyUserData = () => {
    const minLength = 6;
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email) && password.length >= minLength) setIsDisable(false);
    else setIsDisable(true);
  };

  const handleClick = async () => {
    const response = await loginRequest(email, password);
    const { status } = response;
    const ok = 200;
    if (status === ok) {
      const { token } = response.data;
      localStorage.setItem('token', token);
      return setRedirect(true);
    }
    setErrorMessage(response.data.message);
  };

  const history = useHistory();

  useEffect(() => {
    verifyUserData();
  }, [email, password, verifyUserData]);

  return (
    <div>
      <label htmlFor="email-input">
        Email
        <input
          type="email"
          name="email"
          value={ email }
          placeholder="Digite seu Email"
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password-input">
        Senha
        <input
          type="password"
          name="password"
          value={ password }
          placeholder="Digite sua Senha"
          data-testid="password-input"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="signin-btn"
        disabled={ isDisable }
        onClick={ handleClick }
      >
        Entrar
      </button>
      <h5>{errorMessage}</h5>
      <button
        type="button"
        data-testid="no-account-btn"
        onClick={ () => history.push('/register') }
      >
        Ainda nao tenho conta
      </button>
      { redirect && <Redirect to="/products" /> }
    </div>
  );
}

export default Login;
