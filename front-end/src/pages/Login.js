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

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserLogin({
      [name]: value,
    });
  };

  const handleClick = async (event) => {
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

  useEffect(() => {
    const { email, password } = userLogin
    console.log(email, password);
 
      const regexForEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const length = 5;
      const passwordIsValid = password.length > length;
      console.log(passwordIsValid);
      const emailIsValid = regexForEmail.test(email);
      console.log(emailIsValid);
      if (passwordIsValid && emailIsValid === true) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    
  }, [userLogin]);

  return (
    <div>
      { roleType === 'administrador' ? <Redirect to="/admin/orders" /> : <Redirect to="/products" /> }
      <form onSubmit={ (event) => handleClick(event) }>
        <input
          name="email"
          data-testid="email-input"
          type="email"
          onChange={ (event) => handleChange(event) }
        />
        <input
          name="password"
          data-testid="password-input"
          type="password"
          onChange={ (event) => handleChange(event) }
        />
        <button
          data-testid="login-submit-btn"
          type="submit"
          disabled={ disabled }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
