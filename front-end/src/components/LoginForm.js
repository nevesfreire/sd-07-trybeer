import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';
import requestToken from '../api';

const { Input, Field, Control, Label } = Form;

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    const userData = { email, password };
    const response = await requestToken(userData);
    console.log(response);
  };

  return (
    <>
      <Field>
        <Label>
          Email
        </Label>
        <Control>
          <Input
            onChange={ (e) => setEmail(e.target.value) }
            name="email"
            data-testid="email-input"
            placeholder="e.g. trybe@trybe.com"
            type="text"
          />
        </Control>
      </Field>
      <Field>
        <Label>
          Password
        </Label>
        <Control>
          <Input
            onChange={ (e) => setPassword(e.target.value) }
            name="password"
            data-testid="password-input"
            placeholder="password"
            type="password"
          />
        </Control>
      </Field>
      <Field>
        <Control>
          <Button
            onClick={ handleClick }
            data-testid="signin-btn"
            className="button is-black"
          >
            {' '}
            Entrar
          </Button>
        </Control>
        <Link
          to="/register"
          data-testid="no-account-btn"
        >
          Nao estou cadastrado
        </Link>
      </Field>
    </>
  );
}

export default LoginForm;
