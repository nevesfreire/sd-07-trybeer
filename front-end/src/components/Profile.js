import React, { useContext, useEffect, useState } from 'react';
import { FormControl, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import context from '../context';

const ComponentProfile = () => {
  const [updateUserName, setUpdateUserName] = useState({});
  const [successMessage, setSuccessMessage] = useState({});
  const { isOk, setIsOk } = useContext(context);

  const REACT_APP_URL = 'http://localhost:3001';
  const sessionStorageUser = JSON.parse(sessionStorage.getItem('user'));

  if (sessionStorageUser.name === updateUserName) {
    setIsOk(true);
  } else {
    setIsOk(false);
  }

  useEffect(() => {
    setUpdateUserName(sessionStorageUser.name);
  }, [sessionStorageUser.name]);

  const handleSubmit = async (e) => {
    const payload = {
      name: updateUserName,
      email: sessionStorageUser.email,
    };

    sessionStorage.setItem('user', JSON.stringify(payload));

    e.preventDefault();
    fetch(`${REACT_APP_URL}/user`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ ...payload }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSuccessMessage(data);
      });
  };

  return (
    <FormControl className="formRegistration">
      {/* { user.role === 'administrator' && <Redirect to="/admin/orders" /> }
      { user.role === 'client' && <Redirect to="/products" /> } */}
      {/* <h1>Cadastro</h1> */}

      <TextField
        id="userName"
        data-testid="profile-name-input"
        label="Nome"
        type="text"
        value={ updateUserName }
        className="registrationInput"
        variant="outlined"
        placeholder="Monteiro Lobato"
        onChange={ (event) => setUpdateUserName(event.target.value) }
      />

      <TextField
        id="email"
        data-testid="profile-email-input"
        label="Email"
        className="registrationInput"
        value={ sessionStorageUser.email }
        variant="outlined"
        inputProps={ { readOnly: Boolean(true) } }
        placeholder="lobato@lobato.com"
      />

      <hr className="profileHr" />
      <div className="registerBtnGroup">
        <Button
          data-testid="profile-save-btn"
          color="primary"
          variant="contained"
          className="saveBtn"
          disabled={ isOk }
          onClick={ handleSubmit }
        >
          Salvar
        </Button>
      </div>
      { successMessage.message && isOk
        ? <p className="successMessage">{ successMessage.message }</p> : null}
    </FormControl>
  );
};

export default ComponentProfile;
