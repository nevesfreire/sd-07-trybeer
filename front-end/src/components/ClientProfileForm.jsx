import React, { useState } from 'react';
import { updateUserName } from '../services/Api/user';

function ClientProfileForm() {
  const email = JSON.parse(localStorage.getItem('email'));
  const name = JSON.parse(localStorage.getItem('name'));
  const token = JSON.parse(localStorage.getItem('token'));
  const [newName, setNewName] = useState('');
  // const [showError, setShowError] = useState(false);

  const validatename = () => {
    const nameLength = 12;
    const regexNameValidation = /^[a-z ,.'-]+$/i;
    return (
      newName.length >= nameLength
      && name !== newName
      && regexNameValidation.test(newName)
    );
  };

  const saveNewName = async () => {
    // if (result.error) {
    //   setShowError(true);
    // }
    console.log(token);
    localStorage.setItem('name', JSON.stringify(newName, token));
    const result = await updateUserName(newName, token);
    console.log(result);
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
          onClick={ () => saveNewName() }
        >
          Salvar
        </button>
        {/* {showError && <p>Atualização concluída com sucesso.</p>} */}
      </form>
    </div>
  );
}

export default ClientProfileForm;
