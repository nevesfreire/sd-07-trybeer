import React from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from '../../components/LoginForm';

const Login = () => (
  <Container fluid="md">
    <h1>Login</h1>
    <LoginForm />
  </Container>
);

export default Login;
