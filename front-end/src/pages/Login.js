import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import MyContext from '../context/Context';

function Login() {
  const history = useHistory();

  const { email, setEmail, password, setPassword } = useContext(MyContext);
  const [isDisabled, setIsDisabled] = useState(true);

  const isButtonDisabled = () => {
    const MIN_LENGTH = 6;
    if (!email.includes('.com') || password === ' ' || password.length < MIN_LENGTH) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    isButtonDisabled();
  }, [email, password]);

  const handleClick = () => {
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => response.json())
      .then((data) => localStorage.setItem(user, data));
  };

  return (
    <>
      <label htmlFor="email-input">
        Email
        <input
          id="email-input"
          data-testid="email-input"
          type="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password-input">
        Senha
        <input
          id="password-input"
          data-testid="password-input"
          type="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <button
        data-testid="signin-btn"
        type="button"
        onClick={ handleClick }
        disabled={ isDisabled }
      >
        Entrar
      </button>
      <button
        data-testid="no-account-btn"
        type="button"
        onClick={ () => history.push('/register') }
      >
        Ainda não tenho conta
      </button>
    </>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
