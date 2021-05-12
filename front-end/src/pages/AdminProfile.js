import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderAdmin } from '../components';

import ls from '../services';

function AdminProfile() {
  const [username, setUsername] = useState('');
  const [emailUser, setEmailUser] = useState('');

  const history = useHistory();

  const getUserLogged = useCallback(async () => {
    const dataUser = await ls.acessLocalStorage.getUserLocalStorage();
    if (!dataUser) return history.push('/login');
    const { name, email } = dataUser;
    setUsername(name);
    setEmailUser(email);
  }, [history]);

  useEffect(() => {
    getUserLogged();
  }, [getUserLogged]);

  return (
    <>
      <HeaderAdmin title="Admin - Perfil" />
      <div className="card start-component">
        <div className="card-content">
          <div className="media-content">
            <p className="title is-4">Perfil</p>
            <p
              className="subtitle is-5"
              data-testid="profile-name"
            >
              { username }
            </p>
          </div>
          <p
            className="subtitle is-5"
            data-testid="profile-email"
          >
            { emailUser }
          </p>
        </div>
      </div>
    </>
  );
}

export default AdminProfile;
