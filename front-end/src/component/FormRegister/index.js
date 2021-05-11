import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import { requestCreateUserAPI, requestLoginAPI } from '../../services';
import { setToLocalStorage } from '../../utils/localStorage';

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
    <form>
      <label htmlFor="name">
        Nome
        <input
          type="text"
          id="name"
          name="name"
          data-testid="signup-name"
          value={ formRegister.name }
          onChange={ (e) => handleImputChange(e) }
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          type="email"
          id="email"
          name="email"
          data-testid="signup-email"
          value={ formRegister.email }
          onChange={ (e) => handleImputChange(e) }
        />
      </label>
      { errorState && <p>Já existe um usuário com esse e-mail.</p> }
      <label htmlFor="password">
        Senha
        <input
          type="password"
          id="password"
          name="password"
          data-testid="signup-password"
          value={ formRegister.password }
          onChange={ (e) => handleImputChange(e) }
        />
      </label>
      <div>
        <label htmlFor="checkbox">
          <input
            type="checkbox"
            id="checkbox"
            name="checkbox"
            data-testid="signup-seller"
            onChange={ (e) => handleImputChange(e) }
          />
          Quero vender
        </label>
      </div>
      <button
        type="submit"
        data-testid="signup-btn"
        disabled={ buttonState }
        onClick={ (e) => handleSubmit(e) }
      >
        Cadastrar
      </button>
    </form>
  );
}

export default FormRegister;
