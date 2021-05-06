import React, { useState } from 'react';
import api from '../services/api';

const regexEmail = /\S+@\S+\.\S+/;
const passwordMinLength = 6;
import { Link } from 'react-router-dom';


const ComponentLogin = () => {
  const [labelLogin, setLabelLogin] = useState(true);
  const [emailLabel, setEmailLabel] = useState('');
  const [passwordLabel, setPasswordLabel] = useState('');

  const inputValidation = (password) => {
    setPasswordLabel(password);
    const result = regexEmail.test(emailLabel)
    && passwordLabel.length
    >= passwordMinLength;
    setLabelLogin(!result);
  };
  const params = { email: emailLabel, password: passwordLabel };
  const toLogin = async () => {
    api.post('/login', params)
      .then((token) => localStorage.setItem('token', token.data.token))
      .catch((err) => console.log(`Error in login process: ${err}`));
  };

  return (
    <div className="container-login">
      <div>
        <h3 className="form-login-title">Login</h3>
      </div>
      <div>
        <form onSubmit={ () => toLogin() } className="container-int-login">
          <label htmlFor="email" className="form-login">
            Email
            <input
              data-testid="email-input"
              id="email"
              type="email"
              name="email"
              className="label-login"
              onChange={ (event) => setEmailLabel(event.target.value) }
            />
          </label>

          <label htmlFor="password" className="form-login">
            Senha
            <input
              data-testid="password-input"
              id="password"
              type="password"
              name="password"
              className="label-login"
              onChange={ (event) => inputValidation(event.target.value) }
            />
          </label>

          <button type="submit" 
            disabled={ labelLogin } 
            className="btn-submit-login"  
            data-testid="signin-btn"
          >
            Login
          </button>
        </form>
      </div>
     <button type="button" data-testid="no-account-btn">
        <Link to="/register">
          Ainda não tenho conta
        </Link>
     </button>
      <div className="container-link">
        <div className="link-login">Terms of use</div>
        <div className="link-login">Privacy Police</div>
  );
};

export default ComponentLogin;
