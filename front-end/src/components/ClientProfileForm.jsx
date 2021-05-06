import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { updateUserName } from '../services/Api/user';

function ClientProfileForm() {
  const email = JSON.parse(localStorage.getItem('email'));
  const name = JSON.parse(localStorage.getItem('name'));
  const token = JSON.parse(localStorage.getItem('token'));
  const [newName, setNewName] = useState('');
  // const { push } = useHistory();
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
    await updateUserName(newName, token);
    // push('/products');
  };

  return (
    <div>
      <h1 data-testid="top-title">
        Meu perfil
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
          readOnly
          data-testid="profile-email-input"
        >
          Email
          <input
            type="email"
            id="email"
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
