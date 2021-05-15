import React from 'react';
import { Container } from 'react-bootstrap';
import CreateUserForm from '../../components/CreateUserForm';
// import CreateUserForm from '../../components/CreateUserForm';

const Register = () => (
  <Container fluid style={ { width: '450px', heigth: '100vh' } }>
    <h1>Registro</h1>
    <div>
      <CreateUserForm />
    </div>
  </Container>
);

export default Register;
