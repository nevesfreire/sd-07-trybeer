import React, { useState, useEffect } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  const verifyData = () => {
    const six = 6;
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email) && password.length >= six) setIsDisable(false);
    else setIsDisable(true);
  };

  const handleSubmit = () => {
    console.log('Clicou')
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: { email: `${email}`, password: `${password}` },
    }).then((response) => response.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    verifyData();
  }, [email, password, verifyData]);

  return (
    <div>
      <input
        type="email"
        data-testid="email-input"
        name="email"
        autoComplete="off"
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
        onClick={ handleSubmit } // tirei () do handleSubmit
      >
        Entrar
      </button>
      <a href="/register" data-testid="no-account-btn">Ainda não tenho conta</a>
    </div>
  );
}

export default Login;
