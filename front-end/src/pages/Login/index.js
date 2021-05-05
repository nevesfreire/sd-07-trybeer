import React from 'react';
// import { useHistory } from 'react-router-dom';
import { Form, Button, Container, ButtonGroup } from 'react-bootstrap';
import validate from './LoginValidation';
import { useForm, useLocalStorage } from '../../hooks';

const Login = () => {
  // const history = useHistory();
  const [, setUser] = useLocalStorage('user', {});
  const { values, isAllValid, handleChange } = useForm(
    { name: '', email: '', token: '', role: '', password: '' },
    validate,
  );

  const handleSubmit = () => {
    const { name, email, token, role } = values;
    setUser({ name, email, token, role });
    // Fazer verificação do tipo de usuário e redirecionar para sua rota
    // history.push();
  };

  return (
    <Container>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Informe um Email"
            data-testid="email-input"
            name="email"
            onChange={ handleChange }
            value={ values.email || '' }
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Informe uma Senha"
            data-testid="password-input"
            name="password"
            onChange={ handleChange }
            value={ values.password || '' }
          />
        </Form.Group>
        <ButtonGroup size="lg" className="mb-2">
          <Button
            variant="primary"
            type="button"
            data-testid="signin-btn"
            disabled={ !isAllValid }
            onClick={ handleSubmit }
          >
            Entrar
          </Button>
        </ButtonGroup>
        <ButtonGroup size="sm" />
        <Button data-testid="no-account-btn" type="button">
          Ainda não tenho conta
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
