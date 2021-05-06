import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { EmailInput, PasswordInput } from '../components';
import { userDataValidation } from '../utils';
import fetchApi from '../hooks/fetchApi';
import CODE from '../utils/statusCode';

const validation = ({ email, password }) => (
  userDataValidation.email(email) && userDataValidation.password(password)
);

const handleLogin = async (body, history) => {
  const login = await fetchApi('/login', 'POST', body);
  if (login.statusCode === CODE.OK) {
    window.localStorage.setItem('user', JSON.stringify(login.user));
    if (login.user.role === 'administrator') return history.push('/admin/orders');
    history.push('/products');
  }
};

export default function Login() {
  const [user, setUser] = useState({});
  const history = useHistory();
  const handleState = useCallback(({ target: { value, id } }) => {
    setUser((state) => ({ ...state, [id]: value }));
  }, []);

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
        onClick={ () => handleLogin(user, history) }
      >
        Entrar
      </button>

      <Link data-testid="no-account-btn" to="/register">Ainda não tenho conta</Link>

    </div>
  );
}
