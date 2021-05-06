import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [data, setData] = useState('');
  const [logado, setLogado] = useState(false);

  const verifyData = () => {
    const six = 6;
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email) && password.length >= six) setIsDisable(false);
    else setIsDisable(true);
  };

  const saveInLocalStorage = () => {
    window.localStorage.setItem('user', JSON.stringify(
      {
        name: data.user.name,
        email: data.user.email,
        token: data.token,
        role: data.user.role,
      },
    ));

    if (data.token) setLogado(true);
  };

  const handleSubmit = async () => {
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => response.json())
      .then((result) => {
        setData(result);
        console.log(data);
        saveInLocalStorage();
      });
  };

  useEffect(() => {
    verifyData();
  }, [email, password, verifyData]);

  return (
    <div>
      <label htmlFor="email-input">
        Email
        <input
          type="email"
          data-testid="email-input"
          name="email"
          autoComplete="off"
          className="inputLogin"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password-input">
        Senha
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="signin-btn"
        disabled={ isDisable }
        onClick={ handleSubmit } // tirei () do handleSubmit
      >
        Entrar
      </button>
      { logado && data.user.role === 'client' && <Redirect to="/products" /> }
      { logado && data.user.role === 'administrator' && <Redirect to="/admin/orders" /> }
      <a href="/register" data-testid="no-account-btn">Ainda não tenho conta</a>
    </div>
  );
}

export default Login;
