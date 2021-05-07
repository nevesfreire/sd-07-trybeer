import React, { useContext, useEffect } from 'react';
import { FormControl, Button, Checkbox } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import fieldValidate from '../helpers/fieldValidate';
import { useHistory } from 'react-router';
import context from '../context';
import '../css/registration.css';

const ComponentRegister = () => {

  const history = useHistory();

  const { name, setName, email, setEmail } = useContext(context);
  const { password, setPassword, isChecked, setIsChecked } = useContext(context);
  const { isOk, setIsOk } = useContext(context);
  
  const isValid = fieldValidate(name, email, password);

  useEffect(() => {
    setName('');
    setIsChecked(false);
  }, []);

  useEffect(() => {
    console.log('entrei');
    if (!isValid) {
      setIsOk(true);
    } else {
      setIsOk(false);
    }
  }, [isValid, setIsOk]);

  const handleSubmit = (e) => {
    const isValid = fieldValidate(name, email, password);
    if (!isValid) {
      window.alert('Dados inválidos. Tente novamente');
    } else {
      e.preventDefault();
      try {
        fetch(`${process.env.REACT_APP_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ name, email, password, isChecked }),
        })
          .then((response) => response.json())
          .then((data) => (
            data.email
              ? <span>{`Usuario cadastrado com sucesso: ${data.email}`}</span>
              : <span>Já existe um usuário com esse e-mail.</span>));

      } catch (error) {
        console.log(error);
      }
    }
  };

  const handChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="container-register">
        
      <FormControl className="form-registration">
      <h1>Cadastro</h1>
        <TextField
          id="userName"
          label="Nome"
          data-testid="signup-name"
          type="e-mail"
          className="registration-input"
          variant="outlined"
          placeholder="Monteiro Lobato"
          onChange={ (event) => setName(event.target.value) }
        />

        <TextField
          id="email"
          label="Email"
          className="registration-input"
          variant="outlined"
          placeholder="lobato@lobato.com"
          onChange={ (event) => setEmail(event.target.value) }
        />

        <TextField
          id="password"
          label="Senha"
          data-testid="signup-password"
          type="password"
          className="registration-input"
          variant="outlined"
          onChange={ (event) => setPassword(event.target.value) }
        />

        <div className="checkDecision">
          <Checkbox
            data-testid="signup-seller"
            className="registerCheck"
            size="medium"
            checked={ isChecked }
            onChange={ handChange }
          />
          <span>Quero vender</span>
        </div>
        {
            <div className="register-btn-group">
            <Button
              data-testid="signup-btn"
              color="primary"
              variant="contained"
              className="RegisterBtn"
              disabled={isOk}
              onClick={ handleSubmit }
            >
              Cadastrar
            </Button>
        </div>
        }    
      </FormControl>
    </div>
  );
};

export default ComponentRegister;
