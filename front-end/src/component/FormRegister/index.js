import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import { requestCreateUserAPI, requestLoginAPI } from '../../services';
import { setToLocalStorage } from '../../utils/localStorage';
import Container from './style.js';

const defaultForm = {
  name: '',
  email: '',
  password: '',
  checkbox: false,
  role: 'client',
};

function FormRegister() {
  const [formRegister, setFormRegister] = useState(defaultForm);
  const [buttonState, setButtonState] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const history = useHistory();

  const validateName = (name) => {
    const MIN_NAME_LENGTH = 12;
    const nameRe = /^[a-záàâãéèêíïóôõöúçñ ]+$/i;
    if (
      name.length >= MIN_NAME_LENGTH
      && typeof name === 'string'
      && nameRe.test(name)
    ) return true;
  };

  const inputValidation = useCallback(() => {
    const { email, name, password } = formRegister;
    const emailRe = /\S+@\S+\.\S+/;
    const passwordMinLength = 6;
    return (
      validateName(name)
      && emailRe.test(email)
      && password.length >= passwordMinLength
    );
  }, [formRegister]);

  const handleButtonState = useCallback(() => {
    if (inputValidation()) {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  }, [inputValidation]);

  const handleImputChange = (event) => {
    const { value, name } = event.target;
    const { checkbox } = formRegister;

    if (name === 'checkbox') {
      setFormRegister({
        ...formRegister,
        [name]: !checkbox,
      });
    } else {
      setFormRegister({ ...formRegister, [name]: value });
    }
  };

  const handleRoleUser = (checkbox) => {
    let role;
    if (checkbox) {
      role = 'administrator';
      return role;
    }
    if (!checkbox) {
      role = 'client';
      return role;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, status } = await requestCreateUserAPI(formRegister);

    if (status === StatusCodes.CREATED) {
      const userToken = await requestLoginAPI(data);

      if (userToken.data) {
        const { role } = userToken.data;
        setToLocalStorage('user', userToken.data);

        if (role === 'administrator') {
          history.push('/admin/orders');
        } else {
          history.push('/products');
        }
      }
    } else {
      setErrorState(true);
    }
  };

  useEffect(() => {
    setFormRegister((prevState) => ({
      ...prevState,
      role: handleRoleUser(prevState.checkbox),
    }));
  }, [formRegister.checkbox]);

  useEffect(() => {
    handleButtonState();
  }, [formRegister, handleButtonState]);

  return (
    <Container>
      <div className="page-body">
        <h1 className="title">TryBeer</h1>
        <div className="form-container">
          <h2>NOME:</h2>
          <input
            type="text"
            id="name"
            name="name"
            data-testid="signup-name"
            value={ formRegister.name }
            onChange={ (e) => handleImputChange(e) }
          />
          <h2>EMAIL:</h2>
          <input
            type="email"
            id="email"
            name="email"
            data-testid="signup-email"
            value={ formRegister.email }
            onChange={ (e) => handleImputChange(e) }
          />
          {errorState && <p>Já existe um usuário com esse e-mail.</p>}
          <h2>SENHA:</h2>
          <input
            type="password"
            id="password"
            name="password"
            data-testid="signup-password"
            value={ formRegister.password }
            onChange={ (e) => handleImputChange(e) }
          />
          <div className="box">
            <label htmlFor="checkbox">
              <h2>QUERO VENDER</h2>
            </label>
            <input
              type="checkbox"
              id="checkbox"
              name="checkbox"
              data-testid="signup-seller"
              onChange={ (e) => handleImputChange(e) }
            />
            <span className="check" />
          </div>
          <div className="btn-container">
            <button
              className="form-btn"
              type="submit"
              data-testid="signup-btn"
              disabled={ buttonState }
              onClick={ (e) => handleSubmit(e) }
            >
              CADASTRAR
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default FormRegister;
