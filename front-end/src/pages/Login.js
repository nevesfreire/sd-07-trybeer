import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import MyContext from '../context/Context';

function Login() {
  const history = useHistory();

  const { email, setEmail, password, setPassword } = useContext(MyContext);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const isButtonDisabled = () => {
      const MIN_LENGTH = 6;
      if (!email.includes('.com') || password === ' ' || password.length < MIN_LENGTH) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    };
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
      .then((data) => localStorage.setItem('user', JSON.stringify(data)))
      .then(email === 'tryber@trybe.com.br'
        ? history.push('/admin/orders') : history.push('/products'));
  };

  return (
    <div className="main-container">
      <label htmlFor="email-input" className="email-input-label">
        Email
        <input
          id="email-input"
          data-testid="email-input"
          type="email"
          className="email-input"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password-input" className="password-input-label">
        Senha
        <input
          id="password-input"
          data-testid="password-input"
          type="password"
          className="password-input"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <button
        data-testid="signin-btn"
        type="button"
        className="signin-btn"
        onClick={ handleClick }
        disabled={ isDisabled }
      >
        Entrar
      </button>
      <button
        data-testid="no-account-btn"
        type="button"
        className="no-account-btn"
        onClick={ () => history.push('/register') }
      >
        Ainda não tenho conta
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
