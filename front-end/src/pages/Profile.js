import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { localStorage, validate } from '../functions-hooks';

export default function AdminOrders() {
  const user = localStorage.geItem('user');
  const savedName = user.name;
  const [name, setName] = useState(user.name);
  return (
    <div>
      <TopBar title="Meu perfil" />
      <div>
        <h1>perfil</h1>
        <input
          data-testid="profile-name-input"
          id="nameProfile"
          name="name"
          onChange={ ({ target: { value } }) => setName(value) }
          type="text"
          value={ name }
        />
        <input
          data-testid="profile-email-input"
          id="emailProfile"
          name="email"
          readOnly
          type="email"
          value={ user.email }
        />
        <button
          data-testid="profile-save-btn"
          disabled={ !validate.validateName(name) || (savedName === name) }
          // onClick={ buttonRegister }
          type="button"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
