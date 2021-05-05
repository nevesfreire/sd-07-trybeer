import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

function Profile() {
  const [newName, setNewName] = useState('');
  const [success, setSuccess] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const { name, email } = user;

  const history = useHistory();

  useEffect(() => {
    if (!user) return history.push('/login');
  }, [history, user]);

  const successMsg = 'Atualização concluída com sucesso';
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/profile', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ newName, email }),
    }).then((response) => response.json())
      .then((data) => {
        if (data === successMsg) return setSuccess(true);
      });
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
      { success && <span>{successMsg}</span> }
    </>
  );
}

export default Profile;
