import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { nameIsValid, passwordIsValid, emailIsValid } from '../../service/validateInputs';
import { register } from '../../service/trybeerApi';

export default function Register() {
  const [shouldRedirect, setShouldRedirect] = useState('');
  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
    seller: false,
  });

  const verifyInput = () => {
    const { name, email, password } = registerInfo;
    return nameIsValid(name) && passwordIsValid(password) && emailIsValid(email);
  };

  const handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  };

  const handleClick = async () => {
    const { name, email, password, seller } = registerInfo;
    const role = seller === false ? 'client' : 'administrator';
    const result = await register(name, email, password, role);
    console.log(result);
    if (!result.error) {
      setShouldRedirect(role);
    }
  };

  if (shouldRedirect) {
    console.log('entrei no if do redirect', shouldRedirect);
    return (<Redirect
      to={ `/${shouldRedirect === 'administrator' ? 'admin/orders' : 'products'}` }
    />);
  }

  return (
    <div>

      <label htmlFor="name">
        Nome:
        <input
          id="name"
          name="name"
          type="text"
          data-testid="signup-name"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="email">
        Email:
        <input
          id="email"
          name="email"
          type="text"
          data-testid="signup-email"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="password">
        Password:
        <input
          id="password"
          name="password"
          type="password"
          data-testid="signup-password"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="seller">
        <input
          id="seller"
          name="seller"
          type="checkbox"
          data-testid="signup-seller"
          onChange={ handleChange }
        />
        Quero Vender
      </label>

      <button
        type="button"
        data-testid="signup-btn"
        disabled={ !verifyInput() }
        onClick={ handleClick }
      >
        Cadastrar
      </button>
    </div>
  );
}
