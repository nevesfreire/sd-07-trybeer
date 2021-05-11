import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchUser } from '../services/api';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const isDisable = () => {
    const passwordMinLength = 5;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const validEmail = reg.test(email);
    const validPassword = password.length > passwordMinLength;
    if (validEmail && validPassword) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const user = await fetchUser(email, password);
    if (user) {
      const { role } = user;
      localStorage.setItem('user', JSON.stringify(user));
      if (role === 'client') history.push('/products');
      if (role === 'administrator') history.push('/admin/orders');
    }
  };

  return (
    <form className="form">
      <label className="form-label mb-3" htmlFor="email">
        Email
        <input
          className="form-control"
          data-testid="email-input"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={ (event) => setEmail(event.target.value) }
        />
      </label>

      <label className="form-label mb-5" htmlFor="password">
        Senha
        <input
          className="form-control"
          data-testid="password-input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={ (event) => setPassword(event.target.value) }
        />
      </label>
      <button
        className="btn btn-login mb-3"
        data-testid="signin-btn"
        type="button"
        disabled={ isDisable() }
        onClick={ () => handleSubmit() }
      >
        Entrar
      </button>
      <button
        className="btn btn-create"
        data-testid="no-account-btn"
        type="button"
        onClick={ () => history.push('/register') }
      >
        Ainda não tenho conta
      </button>
    </form>
  );
}

export default LoginForm;
