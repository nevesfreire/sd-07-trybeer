import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import TopMenu from '../../../commons/simple/TopMenu';
import { nameChangeRequest } from '../../../services/usersApi';

function Profile() {
  const tokenUser = localStorage.getItem('token');
  const userData = jwtDecode(tokenUser);
  const { name: userNameReq, email: userEmailReq } = userData;
  const [userEmail, setUserEmail] = useState(userEmailReq);
  const [userName, setUserName] = useState(userNameReq);

  const nameChange = async (name, email) => {
    const response = await nameChangeRequest(name, email);
    return console.log(response);
  };

  return (
    <div>
      <TopMenu title="Meu perfil" />
      <h1>My Profile</h1>
      <label htmlFor="name-user">
        Name
        <input id="name-user" value={ userName } />
      </label>
      <label htmlFor="email-user">
        Email
        <input id="email-user" read-only value={ userEmail } />
      </label>
      <button type="button" onClick={ () => nameChange(userName, userEmail) }>
        Salvar
      </button>
    </div>
  );
}

export default Profile;
