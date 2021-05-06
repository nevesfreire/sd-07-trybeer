import React, { useState, useEffect } from 'react';
import services from '../services'
import { Link, useHistory } from 'react-router-dom';
import styles from '../styles/components/LoginForm.module.css';
import { Form, Button } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';
import requestToken from '../api';

const { Input, Field, Control, Label } = Form;

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);

  const history = useHistory();

  const handleClick = async () => {
    const userData = { email, password };
    const response = await requestToken(userData);
    const { token, user: { name, role } } = response.data;
    if(response) localStorage.setItem("user",JSON.stringify({ name, email, token, role }));
    const pathType = role === 'client' ? "/products" : '/admin/orders';
    history.push(pathType)
  };

  useEffect(() => {
    validateData(email, password);
  }, [email, password]);


  const validateData = () => {
    const validEmail = services.validEmail(email)
    const validPassword = services.validPassword(password)
    if(validEmail && validPassword) {
     return setDisable(false)
    } else {
     return setDisable(true)    
  }
}

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
          Senha
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
            disabled={ disable }
          >
            {' '}
            Entrar
          </Button>
        </Control>
        <Link
          to="/register"
          data-testid="no-account-btn"
        >
          Ainda não tenho conta
        </Link>
      </Field>
    </>
  );
}

export default LoginForm;
