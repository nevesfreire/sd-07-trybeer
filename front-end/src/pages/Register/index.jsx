import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { emailAndPasswordValidation, nameValidation } from '../../utils';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [role, setRole] = useState('user');

  const registerValid = () => {
    const result = nameValidation(name) && emailAndPasswordValidation(email, password);
    return result;
  }

  useEffect(() => {
    checkbox ? setRole('administrator') : setRole('user');
  }, [checkbox]);

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    let newUser;
    fetch('http://localhost:3001/user/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    }).then((response) => response.json())
      .then((responseJSON) => {
        newUser = responseJSON;
        localStorage.setItem('user', JSON.stringify(newUser));
        console.log('submit');
        if (newUser.role === 'client') history.push('/products');
        if (newUser.role === 'administrator') history.push('/admin/orders');
      });
    console.log('botão cadastrar');
    console.log('check', checkbox);
  };

  return (
    <main>
      <Form className="form__login">
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            data-testid="signup-name"
            type="text"
            placeholder="Enter name"
            onChange={ ({ target: { value } }) => setName(value) }
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            data-testid="signup-email"
            type="email"
            placeholder="Enter email"
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            data-testid="signup-password"
            type="password"
            placeholder="Password"
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            data-testid="signup-seller"
            type="checkbox"
            label="Quero vender"
            onChange={() => setCheckbox(!checkbox)}

          />
        </Form.Group>
        <Button
          data-testid="signup-btn"
          variant="primary"
          type="button"
          className="form__login__btn"
          onClick={ (event) => handleSubmit(event) }
          disabled={ !registerValid() }
        >
          Cadastrar
        </Button>
      </Form>
    </main>
  )
}
