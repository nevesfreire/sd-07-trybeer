import React from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from '../../components/LoginForm';
import './login.css';

const Login = () => (
  <div className="login">
    <Container
      fluid
      style={ {
        height: '100vh',
        paddingTop: '150px',
        paddingLeft: '60px',
        width: '70vh',
      } }
    >
      <h1>Login</h1>
      <LoginForm />
    </Container>
  </div>
);

export default Login;
