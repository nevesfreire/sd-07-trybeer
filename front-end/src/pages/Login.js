import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import BeerContext from '../context/beerContext';
import { loginRequest } from '../services/usersApi';

function Login() {
  const {
    email, setEmail,
    password, setPassword,
    errorMessage, setErrorMessage,
    role, setRole,
  } = useContext(BeerContext);

  const [isLogged, setIsLogged] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [role, setRole] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  const handleClick = async () => {
    const response = await loginRequest(email, password);
    const { status } = response;
    const ok = 200;
    if (status === ok) {
      const { token } = response.data;
      console.log('token', token)
      localStorage.setItem('token', token);
      const payload = jwtDecode(token);
      console.log(payload)
      setRole(payload.role);
      return setIsLogged(true);
    }
    setErrorMessage(response.data.message);
  };

  const history = useHistory();

  useEffect(() => {
    const verifyUserData = () => {
      const minLength = 6;
      const regex = /\S+@\S+\.\S+/;
      if (regex.test(email) && password.length >= minLength) setIsDisable(false);
      else setIsDisable(true);
    };

    verifyUserData();
  }, [email, password, setIsDisable]);

  return (
    <>
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
        Ainda não tenho conta
      </button>

      { (isLogged && role === 'client') && <Redirect to="/products" /> }
      { (isLogged && role === 'administrator') && <Redirect to="/admin/orders" /> }

    </>
  );
}

export default Login;
