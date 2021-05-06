import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function Profile() {
  const [name, setName] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setName(user.name);
  }, [user.name]);

  const handleClick = () => {
    api.updateUser(name, user.token);
    localStorage.setItem('user', JSON.stringify({ ...user, name }));
  };

  return (
    <div>
      <h1 data-testid="top-title">Meu perfil</h1>
      <form>
        <input
          type="text"
          data-testid="profile-name-input"
          value={ name }
          onChange={ ({ target }) => setName(target.value) }
        />
        <input
          readOnly
          data-testid="profile-email-input"
          value={ user.email }
        />
        <button
          type="button"
          data-testid="profile-save-btn"
          disabled={ name === user.name ? 'disabled' : '' }
          onClick={ handleClick }
        >
          Salvar
        </button>
      </form>

    </div>
  );
}

export default Profile;
