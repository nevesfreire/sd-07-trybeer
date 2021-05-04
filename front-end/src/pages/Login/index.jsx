import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputValidation = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordMinLength = 6;

    return emailRegex.test(email) && password.length >= passwordMinLength;
  };

  const history = useHistory();
  const handleSubmit = () => {
    // fetch para login no back
    // salvar o token no localSotrage
    const user = {
      name: 'Taylor Swift',
      email: 'taylorswift@email.com',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      role: 'admin',
    };

    if (user.role === 'client') history.push('/products');
    if (user.role === 'admin') history.push('/admin');
    localStorage.setItem('user', user);
    console.log('submit');
  };
  const handleRegister = () => {
    history.push('/register');
  };
  return (
    <main>
      <Form className="form__login">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            data-testid="email-input"
            type="email"
            placeholder="Enter email"
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            data-testid="password-input"
            type="password"
            placeholder="Password"
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </Form.Group>
        <Button
          data-testid="signin-btn"
          variant="primary"
          type="button"
          className="form__login__btn"
          onClick={ handleSubmit }
          disabled={ !inputValidation() }
        >
          Entrar
        </Button>
        <Button
          data-testid="no-account-btn"
          variant="primary"
          type="button"
          className="form__login__btn"
          onClick={ handleRegister }
        >
          Ainda nao tenho conta
        </Button>
      </Form>
    </main>
  );
}
