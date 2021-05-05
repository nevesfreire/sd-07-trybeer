import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';

function MeuPerfil() {
  const { sideIsActive, setPageTitle } = useContext(MyContext);

  useEffect(() => {
    setPageTitle('Meu perfil');
  }, []);

  const [newName, setNewName] = useState('');
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({});

  const history = useHistory();
  const OK = 200;

  useEffect(() => {
    const getUser = () => {
      const userStorage = JSON.parse(localStorage.getItem('user'));
      if (!userStorage) return history.push('/login');
      return setUser(userStorage);
    };
    getUser();
  }, [history]);

  const { name, email } = user;

  const successMsg = 'Atualização concluída com sucesso';
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/profile', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ newName, email }),
    }).then((response) => response.status)
      .then((data) => {
        if (data === OK) setSuccess(true);
      });
  };

  return (
    <div>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }
      <form onSubmit={ handleSubmit }>
        <label htmlFor="profile-email-input">
          Email
          <input
            id="profile-email-input"
            data-testid="profile-email-input"
            type="email"
            placeholder={ email }
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
    </div>
  );
}

export default MeuPerfil;
