import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import TopMenu from '../../../commons/simple/TopMenu';
import { nameChangeRequest } from '../../../services/usersApi';

import SideBar from '../../../commons/composed/SideBar';

function Profile() {
  const OK = 200;
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [newName, setNewName] = useState(null);
  const [isDisable, setIsDisable] = useState(true);
  const [messageRequest, setMessageRequest] = useState('');
  // const [isLogged, setIsLogged] = useState(false)
  const history = useHistory();

  useEffect(() => {
    const verifyNameInput = () => {
      const minNameLenght = 12;
      if (userName.length >= minNameLenght && userName !== newName) {
        setIsDisable(false);
      } else setIsDisable(true);
    };

    verifyNameInput();
  }, [userName, newName]);

  const nameChange = async (name, email) => {
    const response = await nameChangeRequest(name, email);
    if (response.status === OK) {
      localStorage.setItem('newName', name);
      return setMessageRequest(response.data.message);
    }
    return console.log(response);
  };

  useEffect(() => {
    const getToken = async () => {
      const token = await localStorage.getItem('token');
      console.log('jwt', jwtDecode(token));
      if (!token) return history.push('/login');
      const userData = jwtDecode(token);
      console.log(token);
      const { name, email, role } = userData;
      console.log('Aquiiii', userData);
      setUserName(name);
      setNewName(name);
      setUserEmail(email);
      setUserRole(role);
      setIsLoading(false);
    };

    getToken();
  }, [history]);

  if (!isLoading && userRole !== 'administrator') {
    return (
      <div>
        <TopMenu title="Meu perfil" />
        <label htmlFor="name-user">
          Name
          <input
            id="name-user"
            value={ newName || userName }
            onChange={ ({ target }) => setNewName(target.value) }
            data-testid="profile-name-input"
          />
        </label>
        <label htmlFor="email-user">
          Email
          <input
            id="email-user"
            readOnly
            value={ userEmail }
            data-testid="profile-email-input"
            disabled={ isDisable }
          />
        </label>
        <button
          type="button"
          onClick={ () => nameChange(newName, userEmail) }
          disabled={ isDisable }
          data-testid="profile-save-btn"
        >
          Salvar
        </button>
        <h3>{messageRequest}</h3>
      </div>
    );
  } if (!isLoading && userRole === 'administrator') {
    return (
      <div>
        <SideBar isAdmin />
        <label htmlFor="profile-name">
          Name
          <h1 data-testid="profile-name">{userName}</h1>
        </label>
        <label htmlFor="profile-email">
          Email
          <h1 data-testid="profile-email">{userEmail}</h1>
        </label>
      </div>
    );
  }
  return (
    <div>
      <h1>Loading...</h1>

    </div>
  );
}

export default Profile;
