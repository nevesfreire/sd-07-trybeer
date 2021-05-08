import React, { useContext, useEffect } from 'react';
import { FormControl, Button, Checkbox } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import fieldValidate from '../helpers/fieldValidate';
import messageSuccess from '../helpers/MessageSuccess';
import context from '../context';
import useRedirect from '../hooks/useRedirect';
import '../css/registration.css';

const ComponentRegister = () => {
  const [setGetEvent] = useRedirect();

  const { name, setName, email, setEmail } = useContext(context);
  const { password, setPassword } = useContext(context);
  const { isOk, setIsOk, user, setUser } = useContext(context);
  const { isChecked, setIsChecked } = useContext(context);

  const isValid = fieldValidate(name, email, password);

  useEffect(() => {
    setName('');
    setIsChecked(false);
  }, [setIsChecked, setName]);

  useEffect(() => {
    if (!isValid) {
      setIsOk(true);
    } else {
      setIsOk(false);
    }
  }, [isValid, setIsOk]);

  const handleSubmit = async (e) => {
    const payload = {
      name,
      email,
      password,
      checked: isChecked,
    };

    if (!isValid) {
      console.log('Dados inválidos.'); // não remover, ainda não sei o que por aqui
    } else {
      e.preventDefault();

      fetch(`${process.env.REACT_APP_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ ...payload }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data.role);
        });
    }
  };

  const handChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const focusRef = (event) => {
    handleSubmit(event);
    setGetEvent(Math.random());
  };

  return (
    <div className="container-register">
      <FormControl className="form-registration">
        <h1>Cadastro</h1>
        <TextField
          id="userName"
          data-testid="signup-name"
          label="Nome"
          type="e-mail"
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
          variant="outlined"
          placeholder="lobato@lobato.com"
          onChange={ (event) => setEmail(event.target.value) }
        />

        <TextField
          id="password"
          data-testid="signup-password"
          label="Senha"
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

        <div className="register-btn-group">
          <Button
            data-testid="signup-btn"
            color="primary"
            variant="contained"
            className="RegisterBtn"
            disabled={ isOk }
            onClick={ focusRef }
          >
            Cadastrar
          </Button>
        </div>
        <div className="succes-message">
          {user ? null : messageSuccess(user)}
        </div>
      </FormControl>
    </div>
  );
};

export default ComponentRegister;
