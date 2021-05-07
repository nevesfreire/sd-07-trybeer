import React, { useContext } from 'react';
import { FormControl, Button, Checkbox, Input } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import fieldValidate from '../helpers/fieldValidate';
import context from '../context';
import '../css/registration.css';

const ComponentRegister = () => {
  const { name, setName, email, setEmail } = useContext(context);
  const { password, setPassword, checked, setChecked } = useContext(context);

  const handleSubmit = (e) => {
    const isValid = fieldValidate(name, email, password);
    if (!isValid) {
      window.alert('Dados inválidos. Tente novamente');
    } else {
      e.preventDefault();
      try {
        fetch(`${process.env.REACT_APP_URL}/register`, {
          // alterar se preciso.
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ name, email, password, checked }),
        })
          .then((response) => response.json())
          .then((data) => (
            data.email
              ? window.alert(`Usuario cadastrado com sucesso: ${data.email}`)
              : window.alert('Esse email já foi utilizado.')));
      } catch (error) {
        console.log(error);
      }
      // history.push('/');
    }
  };

  const handChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="container-register">
      <FormControl className="form-registration">
      
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
            checked={ checked }
            onChange={ handChange }
          />
          <span>Quero vender</span>
        </div>

        <Button
          data-testid="signup-btn"
          color="primary"
          variant="contained"
          className="RegisterBtn"
          onClick={ handleSubmit }
        >
          Cadastrar
        </Button>
      </FormControl>
    </div>
  );
};

export default ComponentRegister;
