import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bulma-components';
import services from '../services';
import 'bulma/css/bulma.min.css';
import { requestToken } from '../api';

const { Input, Field, Control, Label } = Form;

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);
  const [notification, setNotification] = useState(true);

  const history = useHistory();

  const handleClick = async () => {
    const errorCode = 400;
    const userData = { email, password };
    const response = await requestToken(userData);
    if (response === errorCode) {
      return setNotification(false);
    }
    const { token, user: { name, role } } = response.data;
    if (response) {
      services.setUserLocalStorage({ name,
        email,
        token,
        role,
      });
    }
    const pathType = role === 'client' ? '/products' : '/admin/orders';
    history.push(pathType);
  };

  useEffect(() => {
    const validateData = () => {
      const validEmail = services.validEmail(email);
      const validPassword = services.validPassword(password);
      if (validEmail && validPassword) {
        return setDisable(false);
      }
      return setDisable(true);
    };
    validateData();
  }, [email, password]);

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
      <div
        hidden={ notification }
      >
        <p>
          Usuário ou Senha inválida!
          <Button
            remove
            onClick={ () => setNotification(true) }
          />
        </p>
      </div>
      <Field>
        <Control>
          <Button
            onClick={ () => handleClick() }
            data-testid="signin-btn"
            className="button is-black"
            disabled={ disable }
          >
            {' '}
            Entrar
          </Button>
        </Control>
      </Field>
      <Link
        to="/register"
        data-testid="no-account-btn"
      >
        Ainda não tenho conta
      </Link>
    </>
  );
}

export default LoginForm;
