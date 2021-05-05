import React from 'react';
import CreateUserForm from '../../components/CreateUserForm';
// import CreateUserForm from '../../components/CreateUserForm';
import { MainDiv, FormWrapper, H1 } from './styles';

const Register = () => (
  <MainDiv>
    <H1>Registro</H1>
    <FormWrapper>
      <CreateUserForm />
    </FormWrapper>
  </MainDiv>
);

export default Register;
