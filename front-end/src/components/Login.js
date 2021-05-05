import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ComponentLogin = () => {
  const [labelLogin, setLabelLogin] = useState(true);
  const [emailLabel, setEmailLabel] = useState('');
  const [passwordLabel, setPasswordLabel] = useState('');
  console.log(`emailLabel ${emailLabel}`);
  console.log(`passwordLabel ${passwordLabel}`);

  const inputValidation = (password) => {
    console.log(`Input validation password ${password}`);
    console.log(`Input validation emailLabel ${emailLabel}`);
    setPasswordLabel(password);
    console.log(`Input validation passwordLabel ${passwordLabel}`);
    const regexEmail = /\S+@\S+\.\S+/;
    const passwordMinLength = 6;
    const result = regexEmail.test(emailLabel)
      && passwordLabel.length >= passwordMinLength;
    setLabelLogin(!result);
  };
  return (
    <div>
      <div>
        <h3>Login</h3>
      </div>
      <div>
        <form>
          <label htmlFor="email">
            Email
            <input
              data-testid="email-input"
              id="email"
              type="email"
              name="email"
              onChange={ (event) => setEmailLabel(event.target.value) }
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              data-testid="password-input"
              id="password"
              type="password"
              name="password"
              onChange={ (event) => inputValidation(event.target.value) }
            />
          </label>
          <button
            data-testid="signin-btn"
            type="button"
            disabled={ labelLogin }
          >
            Entrar
          </button>
        </form>
      </div>
      <div>
        <button type="button" data-testid="no-account-btn">
          <Link to="/register">
            Ainda não tenho conta
          </Link>
        </button>
      </div>
      <div>
        <div>Terms of use</div>
        <div>Privacy Police</div>
      </div>
    </div>
  );
};

export default ComponentLogin;
