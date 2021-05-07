import React, { useState } from 'react';
import { updateUserName } from '../services/Api/user';

const ClientProfileForm = () => {
  const email = JSON.parse(localStorage.getItem('email'));
  const name = JSON.parse(localStorage.getItem('name'));
  const token = JSON.parse(localStorage.getItem('token'));
  const [newName, setNewName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const validatename = () => {
    const nameLength = 12;
    const regexNameValidation = /^[a-z ,.'-]+$/i;
    return (
      newName.length >= nameLength
      && name !== newName
      && regexNameValidation.test(newName)
    );
  };

  const saveNewName = async (e) => {
    e.preventDefault();
    await updateUserName(newName, token);
    localStorage.setItem('name', JSON.stringify(newName, token));
    setShowSuccess(true);
  };

  return (
    <div>
      <h1 data-testid="top-title">
        Meu perfil
      </h1>
      <form>
        <label
          htmlFor="name"
        >
          Name
          <input
            data-testid="profile-name-input"
            type="text"
            id="name"
            placeholder={ name }
            onChange={ ({ target: { value } }) => setNewName(value) }
          />
        </label>
        <label
          htmlFor="email"
        >
          Email
          <input
            readOnly
            data-testid="profile-email-input"
            type="email"
            id="email"
            value={ email }
          />
        </label>
        <button
          data-testid="profile-save-btn"
          type="submit"
          disabled={ !validatename() }
          onClick={ (e) => saveNewName(e) }
        >
          Salvar
        </button>
        {showSuccess && <p>Atualização concluída com sucesso.</p>}
      </form>
    </div>
  );
};

export default ClientProfileForm;
