import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import registerUser from '../services/User';

export default function Register() {
  const [disabled, setDisabled] = useState(true);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [setShouldRedirect] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setRegisterData({
      ...registerData, [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = registerData;
    let newRegister = {
      name,
      email,
      password,
      role: '',
    };
    if (checkboxValue) {
      newRegister = { ...newRegister, role: 'admin' };
      await registerUser(JSON.stringify(newRegister));
      return <Redirect to="/admin/orders" />;
    }
    newRegister = { ...newRegister, role: 'client' };
    await registerUser(JSON.stringify(newRegister));
    setShouldRedirect(true);
  };

  // const verifyEmail = async (email) => {
  //   const userFound = await getUser(email);
  //   if (userFound) return true;
  //   return false;
  // };

  useEffect(() => {
    const { name, email, password } = registerData;
    const rEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const regexForName = /^[A-Za-z]+/;
    const minLengthForPassword = 6;
    const minLengthForName = 12;
    const passwordIsValid = password.length >= minLengthForPassword;
    const emailIsValid = rEmail.test(email);
    const nameIsValid = regexForName.test(name) && name.length >= minLengthForName;
    // const checkUserEmail = emailIsValid ? verifyEmail(email) : false;
    if (passwordIsValid && emailIsValid && nameIsValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [registerData]);

  return (
    <form onSubmit={ () => handleSubmit() }>
      <label htmlFor="name">
        Nome
        <input
          name="name"
          id="name"
          data-testid="signup-name"
          type="text"
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          name="email"
          id="email"
          data-testid="signup-email"
          type="email"
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          name="password"
          id="password"
          data-testid="signup-password"
          type="password"
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <label htmlFor="checkbox">
        Quero vender
        <input
          checked={ checkboxValue }
          id="checkbox"
          data-testid="signup-seller"
          onChange={ () => setCheckboxValue(!checkboxValue) }
          type="checkbox"
        />
      </label>
      <button
        data-testid="signup-btn"
        type="submit"
        disabled={ disabled }
      >
        Cadastrar
      </button>
    </form>
  );
}
