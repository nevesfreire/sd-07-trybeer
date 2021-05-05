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
  const handleSubmit = (event) => {
    event.preventDefault();
    let newUser;
    fetch('http://localhost:3001/user/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((response) => response.json())
      .then((responseJSON) => {
        newUser = responseJSON;
        localStorage.setItem('user', JSON.stringify(newUser));
        console.log('submit');
        if (newUser.role === 'client') history.push('/products');
        if (newUser.role === 'administrator') history.push('/admin/orders');
      });
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
          <Form.Label>Senha</Form.Label>
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
          onClick={ (event) => handleSubmit(event) }
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
          Ainda não tenho conta
        </Button>
      </Form>
    </main>
  );
}
