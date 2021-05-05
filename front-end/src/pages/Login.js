import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getToken, getUser } from '../services/Login';

export default function Login() {
  const [disabled, setDisabled] = useState(true);
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });
  const [roleType, setRoleType] = useState('');
  const [newUser, setNewUser] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserLogin({
      ...userLogin, [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userToken = await getToken();
    const userInfo = await getUser(userLogin.email);
    const userData = {
      name: userInfo.name,
      email: userInfo.email,
      token: userToken,
      role: userInfo.role,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    setRoleType(userInfo.role);
  };

  const handleClick = () => {
    setNewUser(true);
  };

  useEffect(() => {
    const { email, password } = userLogin
    const regexForEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const length = 5;
    const passwordIsValid = password.length > length;
    const emailIsValid = regexForEmail.test(email);
    if (passwordIsValid && emailIsValid === true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [userLogin]);

  return (
    <>
      { roleType === 'administrador' && <Redirect to="/admin/orders" /> }
      { roleType === 'cliente' && <Redirect to="/products" /> }
      { newUser &&  <Redirect to="/register" /> }
      <form onSubmit={ (event) => handleSubmit(event) }>
        <label htmlFor="id">Email
          <input
            name="email"
            id="email"
            data-testid="email-input"
            type="email"
            onChange={ (event) => handleChange(event) }
          />
        </label>
        <label htmlFor="password">Senha
          <input
            name="password"
            id="password"
            data-testid="password-input"
            type="password"
            onChange={ (event) => handleChange(event) }
          />
        </label>
        <button
          data-testid="signin-btn"
          type="submit"
          disabled={ disabled }
        >
          Entrar
        </button>
        <button
          data-testid="no-account-btn"
          type="button"
          onClick={ () => handleClick() }
        >
          Ainda não tenho conta
        </button>
      </form>
    </>
  );
}
