import React, { useState, useEffect } from 'react';
import { getStorage, setStorage } from '../../services/localStorage';
import { Header } from '../../components';

function ClientProfile() {
  const [userData, setUserData] = useState({});
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [updateUser, setUpdateUser] = useState(false);

  useEffect(() => {
    const user = getStorage('user');
    if (user) setUserData(user);
    setName(user.name);
  }, []);

  useEffect(() => {
    setDisabled(name === userData.name);
  }, [name, userData]);
  function handleSubmit(e) {
    e.preventDefault();
    const newUserData = { ...userData, name };
    setUserData(newUserData);
    setStorage('user', newUserData);
    setUpdateUser(true);
  }

  return (
    <div>
      <Header headerTitle="Meu perfil" />
      <form>
        <label htmlFor="name-input">
          <h6>Nome</h6>
          <input
            type="text"
            id="name-input"
            data-testid="profile-name-input"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="email-input">
          <h6>Email</h6>
          <input
            type="email"
            id="email-input"
            data-testid="profile-email-input"
            value={ userData.email }
            readOnly
          />
        </label>
        <button
          type="submit"
          data-testid="profile-save-btn"
          disabled={ disabled }
          onClick={ handleSubmit }
        >
          Salvar
        </button>
        { updateUser && <p>Atualização concluída com sucesso</p>}
      </form>
    </div>
  );
}

export default ClientProfile;
