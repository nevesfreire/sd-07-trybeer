import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

function Profile() {
  const [newName, setNewName] = useState('');
  const [message, setMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const { name, email } = user;

  const history = useHistory();

  useEffect(() => {
    if (!user) return history.push('login');
  }, [history, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/profile', {
      method: 'UPDATE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, newName }),
    }).then((response) => response.json())
      .then((data) => setMessage(data));
  };

  return (
    <>
      <h1 data-testid="top-title">Meu perfil</h1>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="profile-email-input">
          Email
          <input
            id="profile-email-input"
            data-testid="profile-email-input"
            type="email"
            value={ email }
            readOnly
          />
        </label>
        <label htmlFor="profile-name-input">
          Nome
          <input
            id="profile-name-input"
            data-testid="profile-name-input"
            type="text"
            placeholder={ name }
            onChange={ (e) => setNewName(e.target.value) }
          />
        </label>
        <button
          data-testid="profile-save-btn"
          type="submit"
          disabled={ !newName }
        >
          Salvar
        </button>
      </form>
      <span>{ message }</span>
    </>
  );
}

export default Profile;
