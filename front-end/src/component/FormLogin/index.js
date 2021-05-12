import React, { useEffect, useState, useCallback } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import FormWrapper from './styles';
import { requestLoginAPI } from '../../services';
import { setToLocalStorage } from '../../utils/localStorage';

const defaultForm = {
  email: '',
  password: '',
};

function FormLogin() {
  const [formLogin, setFormLogin] = useState(defaultForm);
  const [buttonState, setButtonState] = useState(true);
  const [role, setRole] = useState('');
  const history = useHistory();

  const handleInputChange = (event, name) => {
    const { value } = event.target;
    setFormLogin({ ...formLogin, [name]: value });
  };

  const inputValidation = useCallback(() => {
    const { email, password } = formLogin;
    const emailRe = /\S+@\S+\.\S+/;
    const passwordMinLength = 6;
    return emailRe.test(email) && password.length >= passwordMinLength;
  }, [formLogin]);

  const handleButtonState = useCallback(() => {
    if (inputValidation()) {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  }, [inputValidation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await requestLoginAPI(formLogin);
    // console.log(token);

    if (user.data) {
      const { data } = user;
      const { role } = data;
      setToLocalStorage('user', data);

      if (role === 'administrator') {
        setRole('administrator');
        // history.push('/admin/orders');
      } else {
        setRole('client');
        // history.push('/products');
      }
    }
  };

  useEffect(() => {
    handleButtonState();
  }, [formLogin, handleButtonState]);

  if(role === 'client') {
    return(
      <Redirect to='/products'/>
    )
  } else if(role === 'administrator') {
    return(
      <Redirect to='/admin/orders'/>
    )    
  }

  return (
    <FormWrapper>
      <label htmlFor="email">
        Email
        <input
          id="email"
          type="email"
          data-testid="email-input"
          value={ formLogin.email }
          onChange={ (event) => handleInputChange(event, 'email') }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          id="password"
          type="password"
          data-testid="password-input"
          value={ formLogin.password }
          onChange={ (event) => handleInputChange(event, 'password') }
        />
      </label>
      <button
        type="submit"
        data-testid="signin-btn"
        disabled={ buttonState }
        onClick={ (event) => handleSubmit(event) }
      >
        Entrar
      </button>
    </FormWrapper>
  );
}

export default FormLogin;
