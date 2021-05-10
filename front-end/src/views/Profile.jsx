import React, { useState } from 'react';
import { userDataValidation } from '../utils';
import TopBar from '../components/menuSideBar/Menu';
import fetchApi from '../hooks/fetchApi';
import CODE from '../utils/statusCode';

export default function Profile() {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const savedName = user.name;
  const [name, setName] = useState(user.name);
  const [response, setResponse] = useState({ SC: false, message: '' });

  const handleRegister = async () => {
    const register = await fetchApi('/register', 'PUT', name, user.token);
    if (register.statusCode === CODE.ACCEPTED) {
      user.name = name;
      window.localStorage.setItem('user', JSON.stringify(user));
    }
    setResponse({ SC: true, message: register.message });
  };

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
        <h4 style={ { visibility: ((response.SC) ? 'visible' : 'hidden') } }>
          {response.message}
        </h4>
        <button
          data-testid="profile-save-btn"
          disabled={ !userDataValidation.name(name) || (savedName === name) }
          onClick={ handleRegister }
          type="button"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
