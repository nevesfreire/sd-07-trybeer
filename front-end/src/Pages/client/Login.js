import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  const verifyData = () => {
    const six = 6;
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email) && password.length >= six) setIsDisable(false);
    else setIsDisable(true);
  };

  useEffect(() => {
    verifyData();
  }, [email, password]);

    return(
      <div>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          autocomplete="off"
          className="inputLogin"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button 
          type="button"
          data-testid="signin-btn"
          disabled={ isDisable }
        >Entrar</button>
        <button onClick={ <Redirect to={'/register'} />} data-testid="no-account-btn">Ainda não tenho conta</button>
      </div>
    )
};

export default Login;