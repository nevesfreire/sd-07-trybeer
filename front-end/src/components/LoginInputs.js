import React from 'react';

function LoginInputs() {
  // const [email, setEmail] = setState('');
  // const [password, setPassword] = setState('');
  return (
    <>
      <label htmlFor="email-input">
        Email
        <input
          id="email-input"
          data-testid="email-input"
          type="email"
          // value={email}
          // onChange={setEmail}
        />
      </label>
      <label htmlFor="password-input">
        Senha
        <input
          id="password-input"
          data-testid="password-input"
          type="password"
          // value={password}
          // onChange={setPassword}
        />
      </label>
    </>
  )
}

export default LoginInputs;