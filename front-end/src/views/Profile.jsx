import React, { useState, useCallback } from 'react';
import { SideBar, NameInput, EmailInput } from '../components';
import { userDataValidation } from '../utils';

const validation = ({ name }, comparator) => (
  userDataValidation.name(name) && name !== comparator
);

export default function Profile() {
  const [user, setUser] = useState({});

  const handleState = useCallback(({ target: { value, id } }) => {
    setUser((state) => ({ ...state, [id]: value }));
  }, []);

  return (
    <div>
      <SideBar title="Meu perfil" />
      <form>
        <NameInput dataTestid="profile-name-input" onChange={ handleState } />
        <EmailInput dataTestid="profile-email-input" value="email" readonly />
        <button
          type="submit"
          data-testid="profile-save-btn"
          disabled={ !validation(user, 'nomedacomparacao') }
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
