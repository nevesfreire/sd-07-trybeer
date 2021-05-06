import React, { useState } from 'react';

function ClientProfile() {
  const email = JSON.parse(localStorage.getItem('email'));
  const name = JSON.parse(localStorage.getItem('name'));
  const [newName, setNewName] = useState('');

  const validatename = () => {
    const nameLength = 12;
    return (
      newName.length >= nameLength
      && name !== newName
    );
  };

  return (
    <div>
      <h1 data-testid="top-title">
        Meu Perfil
      </h1>
      <form>
        <label
          htmlFor="name"
          data-testid="profile-name-input"
        >
          Name
          <input
            type="text"
            id="name"
            placeholder={ name }
            onChange={ ({ target: { value } }) => setNewName(value) }
          />
        </label>
        <label
          htmlFor="email"
          data-testid="profile-email-input"
        >
          Email
          <input
            type="text"
            id="email"
            readOnly
            value={ email }
          />
        </label>
        <button
          data-testid="profile-save-btn"
          type="submit"
          disabled={ !validatename() }
          // onClick={ (e) => cadastrar(e) }
        >
          Salvar
        </button>
      </form>
    </div>
  );
}

export default ClientProfile;
