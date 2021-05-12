import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import TopMenu from '../../../commons/simple/TopMenu';
import { nameChangeRequest } from '../../../services/usersApi';

function Profile() {
  const tokenUser = localStorage.getItem('token');
  const userData = jwtDecode(tokenUser);
  const { name: userNameReq, email: userEmailReq } = userData;
  let newName = localStorage.getItem('newName');
  const OK = 200;

  const [userEmail] = useState(userEmailReq);
  const [userName, setUserName] = useState(newName || userNameReq);
  const [isDisable, setIsDisable] = useState(true);
  const [messageRequest, setMessageRequest] = useState('');
  useEffect(() => {
    const verifyNameInput = () => {
      const minNameLenght = 12;
      if (userName.length >= minNameLenght && userName !== (userNameReq)) {
        setIsDisable(false);
      } else setIsDisable(true);
    };

    verifyNameInput();
  }, [userName, userNameReq]);

  const nameChange = async (name, email) => {
    const response = await nameChangeRequest(name, email);
    if (response.status === OK) {
      newName = localStorage.setItem('newName', name);
      return setMessageRequest(response.data.message);
    }
    return console.log(response);
  };

  console.log(isDisable);
  return (
    <div>
      <TopMenu title="Meu perfil" />
      <h1>My Profile</h1>
      <label htmlFor="name-user">
        Name
        <input
          id="name-user"
          value={ userName }
          onChange={ ({ target }) => setUserName(target.value) }
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
        />
      </label>
      <button
        type="button"
        onClick={ () => nameChange(userName, userEmail) }
        disabled={ isDisable }
        data-testid="profile-save-btn"
      >
        Salvar
      </button>
      <h3>{messageRequest}</h3>
    </div>
  );
}

export default Profile;
