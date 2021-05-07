import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

function Form({ history }) {
  const { login } = useFetch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { location: { pathname } } = history;
  const path = pathname;

  const handleSubmit = async () => {
    const userData = await login(email, password);
    const user = {
      name: userData.name,
      email: userData.email,
      token: userData.token,
      role: userData.role,
    };

    localStorage.setItem('user', JSON.stringify(user));
    if (user.role === 'client') {
      return history.push('/register');
    }
    return history.push('/register');
  };

  const validateEmailAndPassword = () => {
    const emailValidation = (/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i)
      .test(email);
    const minLengthPass = 6;
    const validation = emailValidation && password.length >= minLengthPass
      ? setDisabled(false)
      : setDisabled(true);
    return validation;
  };

  useEffect(() => {
    validateEmailAndPassword();
  }, [email, password]);

  return (
    <div>
      <form>
        { path === '/register' && (
          <label htmlFor="name">
            Nome
            <input
              type="name"
              name="name"
              value={ name }
              data-testid="name-input"
              onChange={ ({ target }) => setName(target.value) }
            />
          </label>
        )}
        <label htmlFor="email">
          E-mail
          <input
            type="email"
            data-testid={ path === '/register' ? 'signup-email' : 'email-input' }
            value={ email }
            name="email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            name="password"
            value={ password }
            data-testid={ path === '/register' ? 'signup-password' : 'password-input' }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        { path === '/register' && (
          <label htmlFor="checkbox">
            <input
              data-testid="signup-seller"
              checked={ checkbox }
              type="checkbox"
              name="checkbox"
              id="checkbox"
              onClick={ () => setCheckbox(!checkbox) }
            />
            Quero vender
          </label>
        )}
      </form>
      <button
        type="button"
        data-testid={ path === '/register' ? 'signup-seller' : 'signin-btn' }
        disabled={ disabled }
        onClick={ () => handleSubmit() }
      >
        { path === '/register' ? 'Cadastrar' : 'Entrar' }
      </button>
      { (path === '/login' || path === '/') && (
        <button
          type="button"
          data-testid="no-account-btn"
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>
      )}
    </div>
  );
}

Form.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Form;
