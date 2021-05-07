import React, { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { EmailInput, PasswordInput } from '../components';
import { userDataValidation } from '../utils';
import fetchApi from '../hooks/fetchApi';
import CODE from '../utils/statusCode';

const validation = ({ email, password }) => (
  userDataValidation.email(email) && userDataValidation.password(password)
);

export default function Login() {
  const [user, setUser] = useState({});
  const [userRole, setUserRole] = useState('');

  const handleState = useCallback(({ target: { value, id } }) => {
    setUser((state) => ({ ...state, [id]: value }));
  }, []);

  const handleLogin = async () => {
    const login = await fetchApi('/login', 'POST', user);
    if (login.statusCode === CODE.OK) {
      window.localStorage.setItem('user', JSON.stringify(login.user));
      setUserRole(login.user.role);
    }
  };

  return (
    <div>
      <EmailInput
        dataTestid="email-input"
        onChange={ handleState }
      />
      <PasswordInput
        dataTestid="password-input"
        onChange={ handleState }
      />
      <button
        data-testid="signin-btn"
        type="button"
        disabled={ !validation(user) }
        onClick={ handleLogin }
      >
        Entrar
      </button>

      <Link data-testid="no-account-btn" to="/register">Ainda não tenho conta</Link>
      {(userRole === 'administrator') && <Redirect to="/admin/orders" />}
      {(userRole === 'client') && <Redirect to="/products" />}

    </div>
  );
}
