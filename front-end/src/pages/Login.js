import React, { useState, useEffect } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const verifyUserData = () => {
    const six = 6;
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email) && password.length > six) setIsDisable(false);
    else setIsDisable(true);
  };

  const handleClick = () => {
    // Setar as coisas do local storage aqui
    setRedirect(true)
  };

  useEffect(() => {
    verifyUserData();
  }, [email, password]);

  return (
    <div>
      <input
          type="email"
          name="email"
          value={ email }
          placeholder="Digite seu Email"
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          type="password"
          name="password"
          value={ password }
          placeholder="Digite sua Senha"
          data-testid="password-input"
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisable }
          onClick={ handleClick }
        >
          Entrar
        </button>
        {/* { redirect && <Redirect to="/outratela" />} */}
    </div>
  )
};

export default Login;