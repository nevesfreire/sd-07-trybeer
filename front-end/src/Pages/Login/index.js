import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import getUser from '../../servicesAPI/api';
// import PropTypes from 'prop-types';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setisValid] = useState(false);
  const [isClicked, setisClicked] = useState(false);
  const [message, setMessage] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    const MIN_NUMBER = 6;
    if (
      regexEmail.test(String(email).toLowerCase())
      && password.length >= MIN_NUMBER
    ) {
      setisValid(true);
      if (isClicked) {
        const user = getUser(email, password);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          if (user.role === 'administrator') history.push('/admin/orders');
          history.push('/products');
        }
        setMessage(true);
      }
    } else {
      setisValid(false);
    }
  }, [email, password, isClicked, history]);

  return (
    <div className="form-wrapper">
      <form className="form-login">
        <input
          onChange={ (e) => setEmail(e.target.value) }
          type="email"
          data-testid="email-input"
          placeholder="Email"
          className="form-input"
        />
        <input
          onChange={ (e) => setPassword(e.target.value) }
          type="password"
          data-testid="password-input"
          placeholder="Password"
          className="form-input"
        />
        <button
          type="button"
          data-testid="signin-btn"
          disabled={ !isValid }
          onClick={ () => setisClicked(true) }
          className="form-button"
        >
          ENTRAR
        </button>
        { message && <p>Usuário ou senha inválido!</p> }
      </form>
      <Link
        data-testid="no-account-btn"
        to="/register"
      >
        Ainda nao tenho conta
      </Link>
    </div>
  );
}

// Login.propTypes = {};
