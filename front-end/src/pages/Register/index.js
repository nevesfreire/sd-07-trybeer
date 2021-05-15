import React from 'react';
import './login.css';
import { Container } from 'react-bootstrap';
import CreateUserForm from '../../components/CreateUserForm';
// import CreateUserForm from '../../components/CreateUserForm';

const Register = () => (
  <div className="signup" style={ { height: '100vh' } }>
    <Container fluid style={ { width: '450px', heigth: '100vh' } }>
      <h1>Registro</h1>
      <CreateUserForm />
    </Container>
  </div>
);

export default Register;
