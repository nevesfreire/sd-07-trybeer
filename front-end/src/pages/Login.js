import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/Context';

function Login(props) {
  const { history } = props;

  const { email, setEmail, password, setPassword } = useContext(MyContext);
  const [isDisabled, setIsDisabled] = useState(true);

  const isButtonDisabled = () => {
    if (!email.includes('.com') || password === ' ' || password.length < 6) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }

  useEffect(() => {
    isButtonDisabled();
  }, [email, password]);

  const handleClick = () => {
    if (email === 'tryber@trybe.com.br') {
      return history.push('/admin/order');
    }
    
    return history.push('/products')
  }

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
