import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { FormControl, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import fieldValidate from '../helpers/fieldValidate';
import context from '../context';

const ComponentProfile = () => {

  const [getNameEmail, setgetNameEmail] = useState({});
  const { user } = useContext(context);
  const REACT_APP_URL = 'http://localhost:3000';

  const handleSubmit = async (e) => {

    const payload = {
      
      };
  
      e.preventDefault();
      fetch(`${REACT_APP_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ ...payload }),
      })
        .then((response) => response.json())
        .then((data) => {
          setgetNameEmail(data);
        });
    }

  return (
    <FormControl className="form-registration">
      {/* { user.role === 'administrator' && <Redirect to="/admin/orders" /> }
      { user.role === 'client' && <Redirect to="/products" /> } */}
      {/* <h1>Cadastro</h1> */}
 
     {/* <div className="main-container"> */}
        <TextField
            id="userName"
            data-testid="signup-name"
            label="Nome"
            type="text"
            value={ user.name }
            className="registration-input"
            variant="outlined"
            placeholder="Monteiro Lobato"
            onChange={ (event) => setName(event.target.value) }
        />

        <TextField
            id="email"
            data-testid="signup-email"
            label="Email"
            className="registration-input"
            value={ user.email }
            variant="outlined"
            inputProps={{ readOnly: Boolean(true) }}
            placeholder="lobato@lobato.com"
            onChange={ (event) => setEmail(event.target.value) }
        />

        <hr />
        <div className="register-btn-group">
            <Button
            data-testid="signup-btn"
            color="primary"
            variant="contained"
            className="RegisterBtn"
            //   onClick={ handleSubmit }
            >
            Salvar
            </Button>
        </div>
    {/* </div> */}
    </FormControl>
  );
};

export default ComponentProfile;
