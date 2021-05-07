import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

const handleLocalStorage = (data, history) => {
  const user = {
    name: data.name,
    email: data.email,
    token: data.token,
    role: data.role,
  };

  localStorage.setItem('user', JSON.stringify(user));
  if (data.role === 'client') {
    return history.push('/products');
  }
  return history.push('/admin/orders');
};

function Form({ history }) {
  const { login, register } = useFetch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { location: { pathname } } = history;
  const path = pathname;

  const submitLogin = async () => {
    const userData = await login(email, password);
    handleLocalStorage(userData, history);
  };

  const submitRegister = async () => {
    const newUserData = await register(name, email, password, checkbox);
    handleLocalStorage(newUserData, history);
  };

  const handleSubmit = async () => {
    if (path === '/register') await submitRegister();
    await submitLogin();
  };

  const validateName = () => {
    const minLengthName = 12;
    if (path === '/register') return name.length >= minLengthName;
    return true;
  };

  const validateEmail = () => (/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i).test(email);

  const validatePassword = () => {
    const minLengthPass = 6;
    return password.length >= minLengthPass;
  };

  const validateInputsValue = () => {
    const emailValidation = validateEmail();
    const nameValidation = validateName();
    const passwordValidation = validatePassword();

    if (nameValidation && emailValidation && passwordValidation) {
      return setDisabled(false);
    }
    setDisabled(true);
  };

  useEffect(() => {
    validateInputsValue();
  }, [email, password, name]);

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
              data-testid="signup-name"
              onChange={ ({ target }) => setName(target.value) }
            />
          </label>
        )}
        <label htmlFor="email">
          Email
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
        data-testid={ path === '/register' ? 'signup-btn' : 'signin-btn' }
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
