import React, { useCallback, useState } from 'react';
import { EmailInput, PasswordInput, NameInput } from '../components';
import { userDataValidation } from '../utils';

const validation = ({ email, password, name }) => (
  userDataValidation.email(email)
    && userDataValidation.password(password)
    && userDataValidation.name(name)
);

export default function Register() {
  const [user, setUser] = useState({});

  const handleState = useCallback(({ target: { id, value } }) => {
    setUser((state) => ({ ...state, [id]: id === 'admin' ? !state.admin : value }));
  }, []);

  console.log(validation(user));

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
          id="admin"
        />
        Quero vender
      </label>

      <button
        data-testid="signup-btn"
        type="submit"
      >
        Cadastrar
      </button>
    </form>
  );
}
