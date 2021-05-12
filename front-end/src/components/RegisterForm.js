import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchRegisterNewUser } from '../services/api';

function RegisterForm() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [password, setPassword] = useState('');
  const [emailTaken, setEmailTaken] = useState(true);

  const isDisable = () => {
    const nameMinLength = 11;
    const passwordMinLength = 5;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const regLetters = /^[A-Z a-z]+$/;
    const validName = regLetters.test(name);
    const validEmail = reg.test(email) && name.length > nameMinLength;
    const validPassword = password.length > passwordMinLength;
    if (validEmail && validPassword && validName) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const statusSuccess = 201;
    const role = checkbox ? 'administrator' : 'client';
    const response = await fetchRegisterNewUser({
      name, password, email, role,
    });
    const { status } = response;
    const user = await response.json();
    localStorage.setItem('user', JSON.stringify(user));
    if (status === statusSuccess) {
      if (role === 'client') history.push('/products');
      if (role === 'administrator') history.push('/admin/orders');
    } else {
      setEmailTaken(false);
    }
  };

  return (
    <form className="form">
      <label className="form-label mb-3" htmlFor="name">
        Nome
        <input
          className="form-control"
          data-testid="signup-name"
          type="text"
          name="name"
          id="name-register"
          placeholder="Nome"
          onChange={ (event) => setName(event.target.value) }
        />
      </label>

      <label className="form-label mb-3" htmlFor="email-register">
        Email
        <input
          className="form-control"
          data-testid="signup-email"
          type="email"
          name="email"
          id="email-register"
          placeholder="E-mail"
          onChange={ (event) => setEmail(event.target.value) }
        />
      </label>

      <label className="form-label mb-3" htmlFor="password-register">
        Senha
        <input
          className="form-control"
          data-testid="signup-password"
          type="password"
          name="password"
          id="password-register"
          placeholder="Password"
          onChange={ (event) => setPassword(event.target.value) }
        />
      </label>

      <label className="form-label mb-3" htmlFor="checkbox-register">
        <input
          type="checkbox"
          data-testid="signup-seller"
          className="checkbox"
          name="checkbox-register"
          id="checkbox-register"
          onChange={ () => setCheckbox(!checkbox) }
        />
        {' '}
        Quero vender
      </label>
      <button
        className="btn btn-login mb-3"
        data-testid="signup-btn"
        type="button"
        disabled={ isDisable() }
        onClick={ () => handleSubmit() }
      >
        Cadastrar
      </button>
      <h3 hidden={ emailTaken }>Já existe um usuário com esse e-mail.</h3>
    </form>
  );
}

export default RegisterForm;
