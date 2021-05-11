import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import TopMenu from '../../../commons/simple/TopMenu';
import { nameChangeRequest } from '../../../services/usersApi';

import { withRouter } from 'react-router-dom';

import SideBar from '../../../commons/composed/SideBar';

function Profile({ history }) {
  const OK = 200;
  const [role, setRole] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [newName, setNewName] = useState(null);
  const [isDisable, setIsDisable] = useState(true);
  const [messageRequest, setMessageRequest] = useState('');
  // const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const verifyNameInput = () => {
      const minNameLenght = 12;
      if ( userName?.length >= minNameLenght && userName !== newName) {
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
      console.log(jwtDecode(token))
      if(!token) return history.push('/login')
      const userData = jwtDecode(token);
      console.log(token)
      const { name, email, role } = userData;
      console.log('Aquiiii', userData)
      setUserName(name)
      setNewName(name)
      setUserEmail(email)
      setRole(role);
      setIsLoading(false)
    }

    getToken()
  }, [history])

  if (!isLoading) {
  return (
    <div>
      { role !== 'administrator' && <TopMenu title="Meu perfil" /> }
      { role === 'administrator' && <SideBar isAdmin={ true } /> }
      <label htmlFor="name-user">
        Name
        <input
          id="name-user"
          value={ newName ? newName : userName }
          onChange={ ({ target }) => setNewName(target.value) }
          data-testid={role === 'administrator' ? "profile-name" : "profile-name-input"}
          disabled={role === 'administrator'}
        />
      </label>
      <label htmlFor="email-user">
        Email
        <input
          id="email-user"
          readOnly
          value={ userEmail }
          data-testid={ role === 'administrator' ? "profile-email" : "profile-email-input" }
          disabled={role === 'administrator'}
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
  )
  } else {
    return(
      <div>
        <h1>Loading...</h1>
      </div>
    )
  } 
}

export default withRouter(Profile);
