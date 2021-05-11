import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { fetchs, localStorage, validate } from '../functions-hooks';

export default function AdminOrders() {
  const user = localStorage.geItem('user');
  const savedName = user.name;
  const [name, setName] = useState(user.name);
  const [response, setResponse] = useState({ visible: false, message: '' });

  const buttonUpdate = async () => {
    const { fetchAPI } = fetchs;
    const obj = { name };
    const api = await fetchAPI('/register', 'PUT', obj, user.token);
    if (api.error) {
      user.name = name;
      localStorage.setItem('user', user);
    }
    setResponse({ visible: true, message: api.message });
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
        <h4 style={ { visibility: (response.visible ? 'visible' : 'hidden') } }>
          {response.menssage}
        </h4>
        <button
          data-testid="profile-save-btn"
          disabled={ !validate.validateName(name) || (savedName === name) }
          onClick={ buttonUpdate }
          type="button"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
