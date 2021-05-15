import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { userLogin } from '../../services/apiService';
import validateLogin from './validationLogin';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onSubmitHandler = async (e, user) => {
    e.preventDefault();

    // req da api enviando:
    const response = await userLogin(user).then((apiResponse) => apiResponse);
    if ((await response.role) === 'administrator') {
      localStorage.setItem('user', JSON.stringify(response));
      history.push('/admin/orders');
    }
    if ((await response.role) === 'client') {
      localStorage.setItem('user', JSON.stringify(response));
      history.push('/products');
    }
  };

  return (
    <Form>
      <Form.Group as={ Row } controlId="formHorizontalEmail">
        <Form.Label htmlFor="email-input" column sm={ 3 }>
          Email
        </Form.Label>
        <Col sm={ 10 }>
          <Form.Control
            style={ {
              background: 'transparent',
              borderColor: 'rgb(227,183,88)',
              color: 'rgb(232,214,210)',
            } }
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            placeholder="Email address"
            type="email"
            name="email"
            data-testid="email-input"
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={ Row } controlId="formHorizontalPassword">
        <Form.Label htmlFor="password-input" column sm={ 3 }>
          Senha
        </Form.Label>
        <Col sm={ 10 }>
          <Form.Control
            style={ {
              background: 'transparent',
              borderColor: 'rgb(227,183,88)',
              color: 'rgb(232,214,210)',
            } }
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            placeholder="Password"
            type="password"
            name="password"
            data-testid="password-input"
            required
          />
        </Col>
      </Form.Group>
      <Row>
        <Col>
          <Button
            style={{backgroundColor: 'rgb(133,54,21)', borderColor: 'rgb(133,54,21)'}}
            type="submit"
            data-testid="signin-btn"
            disabled={ validateLogin(email, password) }
            onClick={ (e) => onSubmitHandler(e, { email, password }) }
          >
            Entrar
          </Button>
        </Col>
        <Col>
          <Link
            to="/register"
            data-testid="no-account-btn"
            style={ { color: 'rgb(232,214,210)', marginLeft: '-50px', justifyContent: 'center' } }
          >
            Ainda não tenho conta
          </Link>
        </Col>
      </Row>
    </Form>
  );
}

export default LoginForm;
