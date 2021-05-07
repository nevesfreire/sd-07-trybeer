import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { EmailInput, PasswordInput, NameInput } from '../components';
import fetchApi from '../hooks/fetchApi';
import { userDataValidation } from '../utils';
import CODE from '../utils/statusCode';

const validation = ({ email, password, name }) => (
  userDataValidation.email(email)
  && userDataValidation.password(password)
  && userDataValidation.name(name)
);

export default function Register() {
  const [user, setUser] = useState({
    nome: '',
    email: '',
    password: '',
    role: false,
  });

  const [erroMessage, setErrorMessage] = useState(false);

  const [userRole, setUserRole] = useState('');

  const handleState = ({ target: { id, value } }) => {
    setUser((state) => ({ ...state, [id]: id === 'role' ? !state.role : value }));
  };

  const handleRegister = async () => {
    const register = await fetchApi('/register', 'POST', user);
    if (register.statusCode === CODE.CREATED) {
      window.localStorage.setItem('user', JSON.stringify(register.user));
      setUserRole(register.user.role);
    }
    setErrorMessage(true);
  };

  return (
    <form>
      <NameInput
        dataTestid="signup-name"
        onChange={ handleState }
      />
      <EmailInput
        dataTestid="signup-email"
        onChange={ handleState }
      />
      <PasswordInput
        dataTestid="signup-password"
        onChange={ handleState }
      />
      <label htmlFor="checkboxInput">
        <input
          type="checkbox"
          onChange={ handleState }
          data-testid="signup-seller"
          id="role"
        />
        Quero vender
      </label>

      <button
        data-testid="signup-btn"
        type="button"
        disabled={ !validation(user) }
        onClick={ handleRegister }
      >
        Cadastrar
      </button>
      <span visibility={ erroMessage ? 'hidden' : 'visible' }>
        Já existe um usuário com esse e-mail.
      </span>

      {(userRole === 'administrator') && <Redirect to="/admin/orders" />}
      {(userRole === 'client') && <Redirect to="/products" />}
    </form>
  );
}
