import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { emailAndPasswordValidation, nameValidation } from '../../utils';
import { loginFetch, newUserRegister, pathRedirectByRole, searchUserByEmail }
  from '../../services';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [role, setRole] = useState('user');
  const [userRegisterValid, setUserRegisterValid] = useState(true);

  const registerValid = () => {
    const result = nameValidation(name) && emailAndPasswordValidation(email, password);
    return result;
  };
  useEffect(() => {
    if (checkbox) setRole('administrator');
    else setRole('client');
  }, [checkbox]);

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('botão cadastrar');

    console.log('check', checkbox);
    const newUserData = { name, email, password, role };
    const userExist = await searchUserByEmail(email);
    console.log('userExists', userExist.message);

    if (userExist.message === 'usuário já existe') setUserRegisterValid(false);

    if (userExist.message === 'usuário não encontrado') {
      await newUserRegister(newUserData);

      const user = await loginFetch({ email, password });

      localStorage.setItem('user', JSON.stringify(user));
      history.push(pathRedirectByRole(user.role));
    }
  };

  return (
    <main>
      <Form className="form__login">
        <Form.Group>
          <Form.Label>Nome</Form.Label>
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
            onChange={ () => setCheckbox(!checkbox) }

          />
        </Form.Group>
        <Form.Text className="text-muted" hidden={ userRegisterValid }>
          Já existe um usuário com esse e-mail.
        </Form.Text>
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
  );
}
