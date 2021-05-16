import React, { useState, useEffect } from 'react';

import { Redirect } from 'react-router-dom';

function Login() {
  // const [email, setEmail] = useState('user@test.com');
  // const [password, setPassword] = useState('test123');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [resul, setResult] = useState();
  const [logado, setLogado] = useState(false);

  const verifyData = () => {
    const six = 6;
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email) && password.length >= six) setIsDisable(false);
    else setIsDisable(true);
  };

  const saveInLocalStorage = (res) => {
    localStorage.setItem('user', JSON.stringify(
      {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        token: res.token,
        role: res.user.role,
      },
    ));

    setResult(res);

    if (res.token) setLogado(true);
  };

  const handleSubmit = async () => {
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => response.json())
      .then((data) => {
        saveInLocalStorage(data);
      });
  };

  useEffect(() => {
    verifyData();
  }, [email, password]);

  useEffect(() => {
    localStorage.clear();
  }, [])

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
          // value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password-input">
        Senha
        <input
          type="password"
          data-testid="password-input"
          name="password"
          // value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="signin-btn"
        disabled={ isDisable }
        onClick={ handleSubmit }
      >
        Entrar
      </button>
      { logado && resul.user.role === 'client' && <Redirect to="/products" /> }
      { logado && resul.user.role === 'administrator' && <Redirect to="/admin/orders" /> }

      <a href="/register" data-testid="no-account-btn">Ainda não tenho conta</a>
    </div>
  );
}

export default Login;
