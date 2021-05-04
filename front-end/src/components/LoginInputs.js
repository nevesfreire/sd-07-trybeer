import React, { useContext } from 'react';
import MyContext from '../context/Context';

function LoginInputs() {
  const { email, setEmail, password, setPassword } = useContext(MyContext);

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
    </>
  );
}

export default LoginInputs;
