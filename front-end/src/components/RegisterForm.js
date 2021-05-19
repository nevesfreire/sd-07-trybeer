import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bulma-components';
import { useHistory } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import services from '../services';
import { registerUser } from '../api';

import logo from '../img/logo.svg';

const { Input, Field, Control, Label, Checkbox } = Form;

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(false);
  const [disable, setDisable] = useState(true);
  const [notification, setNotification] = useState(true);

  const history = useHistory();
  const errorCode = 401;

  useEffect(() => {
    const validateData = () => {
      const validName = services.validName(name);
      const validEmail = services.validEmail(email);
      const validPassword = services.validPassword(password);
      if (validName && validEmail && validPassword) {
        return setDisable(false);
      }
      return setDisable(true);
    };
    validateData();
  }, [name, email, password]);

  const handleClick = async () => {
    const userRole = role ? 'administrator' : 'client';
    const user = {
      email,
      name,
      password,
      role: userRole,
    };
    const result = await registerUser(user);
    if (result === errorCode) {
      return setNotification(false);
    }
    const { data } = result;
    services.acessLocalStorage.setUserLocalStorage({ name,
      email,
      token: data,
      role: userRole,
    });

    const pathType = userRole === 'client' ? '/products' : '/admin/orders';
    history.push(pathType);
  };

  return (
    <div className="login-form m-3">
      <div className="card-image">
        <figure className="image is-3by1">
          <img src={ logo } alt="Undefined" />
        </figure>
      </div>
      <Field>
        <Label>
          Nome
        </Label>
        <Control>
          <Input
            onChange={ (e) => setName(e.target.value) }
            name="name"
            data-testid="signup-name"
            placeholder="Chuck Norrys"
            type="text"
          />
        </Control>
      </Field>
      <Field>
        <Label>
          Email
        </Label>
        <Control>
          <Input
            onChange={ (e) => setEmail(e.target.value) }
            name="email"
            data-testid="signup-email"
            placeholder="chuck@emailcom"
            type="text"
          />
        </Control>
      </Field>
      <div
        hidden={ notification }
      >
        <p>
          Já existe um usuário com esse e-mail.
          <Button
            remove
            onClick={ () => setNotification(true) }
          />
        </p>
      </div>
      <Field>
        <Label>
          Senha
        </Label>
        <Control>
          <Input
            onChange={ (e) => setPassword(e.target.value) }
            name="email"
            data-testid="signup-password"
            placeholder="123456"
            type="text"
          />
        </Control>
      </Field>
      <Field>
        <Control>
          <Label>
            <Checkbox
              type="checkbox"
              data-testid="signup-seller"
              onChange={ () => setRole(!role) }
            />
            Quero vender
          </Label>
        </Control>
      </Field>
      <Field>
        <Control>
          <Button
            onClick={ () => handleClick() }
            data-testid="signup-btn"
            className="button is-black"
            disabled={ disable }
          >
            {' '}
            Cadastrar
          </Button>
        </Control>
      </Field>
    </div>
  );
}

export default RegisterForm;
