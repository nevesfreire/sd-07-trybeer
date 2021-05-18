import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import { FormContainer, LiterallyAForm } from '../styled/FormStyle.styled';
import { MainButton, LinkButton } from '../styled/Buttons.styled';

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

const validateName = (name, path) => {
  const minLengthName = 12;
  const verifyLength = name.length >= minLengthName;
  const verifyCharacter = (/^[a-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/i).test(name);
  if (path === '/register') return verifyLength && verifyCharacter;
  return true;
};

const validateEmail = (email) => (/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i)
  .test(email);

const validatePassword = (password) => {
  const minLengthPass = 6;
  return password.length >= minLengthPass;
};

const submitRegister = async (...restParams) => {
  const [
    name,
    email,
    password,
    checkbox,
    history,
    register,
    setEmailAlreadyExist,
  ] = restParams;
  const newUserData = await register(name, email, password, checkbox);
  if (newUserData.message) return setEmailAlreadyExist(newUserData.message);
  handleLocalStorage(newUserData, history);
};

const submitLogin = async (email, password, history, login) => {
  const userData = await login(email, password);
  if (userData.token) return handleLocalStorage(userData, history);
  return alert('Email ou senha incorreto');
};

function Form({ history }) {
  const { login, register } = useFetch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [emailAlreadyExist, setEmailAlreadyExist] = useState(false);

  const { location: { pathname } } = history;
  const path = pathname;

  const handleSubmit = async () => {
    if (path === '/register') {
      return submitRegister(
        name,
        email,
        password,
        checkbox,
        history,
        register,
        setEmailAlreadyExist,
      );
    }
    return submitLogin(email, password, history, login);
  };

  const validateInputsValue = () => {
    const emailValidation = validateEmail(email);
    const nameValidation = validateName(name, path);
    const passwordValidation = validatePassword(password);

    setDisabled(!(nameValidation && emailValidation && passwordValidation));
  };

  useEffect(() => {
    validateInputsValue();
  }, [email, password, name]);

  return (
    <FormContainer>
      <LiterallyAForm>
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
          <label
            className="admin-input"
            htmlFor="checkbox"
          >
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
      </LiterallyAForm>
      { emailAlreadyExist && <span>{ emailAlreadyExist }</span> }
      <MainButton
        isForm
        type="button"
        data-testid={ path === '/register' ? 'signup-btn' : 'signin-btn' }
        disabled={ disabled }
        onClick={ () => handleSubmit() }
      >
        { path === '/register' ? 'Cadastrar' : 'Entrar' }
      </MainButton>
      { (path === '/login' || path === '/') && (
        <LinkButton
          type="button"
          data-testid="no-account-btn"
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </LinkButton>
      )}
    </FormContainer>
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
