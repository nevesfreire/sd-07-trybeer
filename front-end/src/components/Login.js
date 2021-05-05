import React, { useState } from 'react';
import api from '../services/api';

const regexEmail = /\S+@\S+\.\S+/;
const passwordMinLength = 6;

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
    <div>
      <div>
        <h3>Login</h3>
      </div>
      <div>
        <form onSubmit={ () => toLogin() }>
          <label htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              name="email"
              onChange={ (event) => setEmailLabel(event.target.value) }
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              name="password"
              onChange={ (event) => inputValidation(event.target.value) }
            />
          </label>
          <button type="submit" disabled={ labelLogin }>
            Login
          </button>
        </form>
      </div>
      <div>
        <div>Terms of use</div>
        <div>Privacy Police</div>
      </div>
    </div>
  );
};

export default ComponentLogin;
