import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput } from '../components';
import { userDataValidation } from '../utils';

const validation = ({ email, password }) => (
  userDataValidation.email(email) && userDataValidation.password(password)
);

export default function Login() {
  const [user, setUser] = useState({});

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
      >
        Entrar
      </button>

      <Link data-testid="no-account-btn" to="/register">Ainda nao tenho conta</Link>

    </div>
  );
}
