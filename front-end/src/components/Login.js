import React, { useState } from 'react';

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
    const result = regexEmail.test(emailLabel) && passwordLabel.length >= passwordMinLength;
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
          <button
            disabled={ labelLogin }
          >
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
