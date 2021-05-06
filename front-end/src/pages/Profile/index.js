import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import api from '../../services/api';

function Profile() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  useEffect(() => {
    if (user.role === 'administrator') history.push('/admin/profile');
    setName(user.name);
  }, [history, user.name, user.role]);

  const handleClick = () => {
    api.updateUser(name, user.token);
    localStorage.setItem('user', JSON.stringify({ ...user, name }));
    setMessage('Atualização concluída com sucesso');
  };

  return (
    <div>
      <h1 data-testid="top-title">Meu perfil</h1>
      <form>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            id="name"
            data-testid="profile-name-input"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            readOnly
            data-testid="profile-email-input"
            value={ user.email }
          />
        </label>
        <button
          type="button"
          data-testid="profile-save-btn"
          disabled={ name === user.name ? 'disabled' : '' }
          onClick={ handleClick }
        >
          Salvar
        </button>
        <p>{ message }</p>
      </form>

    </div>
  );
}

export default Profile;
