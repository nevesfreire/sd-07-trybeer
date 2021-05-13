import React, { useEffect, useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { requestLoginAPI } from '../../services';
import { setToLocalStorage } from '../../utils/localStorage';
import Container from './style';

const defaultForm = {
  email: '',
  password: '',
};

function FormLogin() {
  const [formLogin, setFormLogin] = useState(defaultForm);
  const [buttonState, setButtonState] = useState(true);
  const [roleUser, setRoleUser] = useState('');

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
        setRoleUser('administrator');
        // history.push('/admin/orders');
      } else {
        setRoleUser('client');
        // history.push('/products');
      }
    }
  };

  useEffect(() => {
    handleButtonState();
  }, [formLogin, handleButtonState]);

  if (roleUser === 'client') {
    return (
      <Redirect to="/products" />
    );
  } if (roleUser === 'administrator') {
    return (
      <Redirect to="/admin/orders" />
    );
  }

  return (
    <Container>
      <div className="page-body">
        <h1 className="title">TryBeer</h1>
        <div className="form-container">
          <h2>EMAIL:</h2>
          <input
            id="email"
            type="email"
            data-testid="email-input"
            value={ formLogin.email }
            onChange={ (event) => handleInputChange(event, 'email') }
          />
          <h2>SENHA:</h2>
          <input
              id="password"
              type="password"
              data-testid="password-input"
              value={ formLogin.password }
              onChange={ (event) => handleInputChange(event, 'password') }
            />
          <div className="btn-container">
            <button
              id="btn-submit"
              type="submit"
              className="form-btn"
              data-testid="signin-btn"
              disabled={ buttonState }
              onClick={ (event) => handleSubmit(event) }
            >
              ENTRAR
            </button>
            <button
              id="btn-new-user"
              className="form-btn"
              type="button"
              onClick={ () => { history.push('/register'); } }
              data-testid="no-account-btn"
            >
              AINDA NÃO TENHO CONTA
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default FormLogin;
