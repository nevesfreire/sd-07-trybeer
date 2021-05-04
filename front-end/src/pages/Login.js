import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
    setRedirect(true);
  };

  const history = useHistory();

  useEffect(() => {
    verifyUserData();
  }, [email, password, verifyUserData]);

  console.log(redirect);
  return (
    <div>
      <label htmlFor="email-input">
        Email
        <input
          type="email"
          name="email"
          value={ email }
          placeholder="Digite seu Email"
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password-input">
        Senha
        <input
          type="password"
          name="password"
          value={ password }
          placeholder="Digite sua Senha"
          data-testid="password-input"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="signin-btn"
        disabled={ isDisable }
        onClick={ handleClick }
      >
        Entrar
      </button>
      <button
        type="button"
        data-testid="no-account-btn"
        onClick={ () => history.push('/register') }
      >
        Ainda nao tenho conta
      </button>
      {/* { redirect && <Redirect to="/outratela" />} */}
    </div>
  );
}

export default Login;
