import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';

function Profile() {
  const { email, name } = JSON.parse(localStorage.getItem('user'));
  const [newName, setNewName] = useState(name);
  const [isDisable, setIsDisable] = useState(true);
  const [cadSuss, setCadSuss] = useState(false);

  const verifyData = (target) => {
    const nameUser = localStorage.getItem('user').name;
    if (nameUser !== target) {
      setNewName(target.value);
      setIsDisable(false);
    }
  };

  const handleSubmit = () => {
    const ok = 200;
    fetch('http://localhost:3001/profile', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name: newName, email }),
    }).then((response) => response.json())
      .then((data) => {
        if (data.status && data.status === ok) {
          setCadSuss(true);
        }
      });
  };

  useEffect(() => {
    verifyData();
  }, [name]);

  return (
    <div>
      <Header name="Meu perfil" />
      <label htmlFor="profile-name-input">
        Name
        <input
          data-testid="profile-name-input"
          type="text"
          value={ newName }
          onChange={ ({ target }) => verifyData(target) }
        />

      </label>
      <label htmlFor="profile-email-input">
        Email
        <input
          readOnly
          value={ email }
          name="email"
          data-testid="profile-email-input"
          type="text"
        />
      </label>
      <button
        data-testid="profile-save-btn"
        type="button"
        disabled={ isDisable }
        onClick={ handleSubmit }
      >
        Salvar
      </button>
      { cadSuss && <p>Atualização concluída com sucesso</p>}
    </div>
  );
}

export default Profile;
