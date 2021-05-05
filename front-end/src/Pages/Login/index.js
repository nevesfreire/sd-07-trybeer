import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { getUser } from '../../servicesAPI/api';
// import PropTypes from 'prop-types';
import { validateFields } from '../../util/validations';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setisValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (validateFields(email, password) === true) {
      setisValid(true);
    }
  }, [email, password, history]);

  const handleSubmit = async () => {
    const user = await getUser({ email, password });
    if (user.data) {
      localStorage.setItem('user', JSON.stringify(user));
      if (user.data.role === 'administrator') return history.push('/admin/orders');
      return history.push('/products');
    }
    setShowMessage(true);
  };

  return (
    <div className="form-wrapper">
      <form className="form-login">
        <label htmlFor="email">
          Email
          <input
            id="email"
            onChange={ (e) => setEmail(e.target.value) }
            type="email"
            data-testid="email-input"
            placeholder="Email"
            className="form-input"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            id="password"
            onChange={ (e) => setPassword(e.target.value) }
            type="password"
            data-testid="password-input"
            placeholder="Senha"
            className="form-input"
          />
        </label>
        <button
          type="button"
          data-testid="signin-btn"
          disabled={ !isValid }
          onClick={ handleSubmit }
          className="form-button"
        >
          Entrar
        </button>
        { showMessage && <p>Usuário ou senha inválido!</p> }
      </form>
      <Link
        data-testid="no-account-btn"
        to="/register"
      >
        Ainda não tenho conta
      </Link>
    </div>
  );
}

// Login.propTypes = {};
