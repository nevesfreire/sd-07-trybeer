import React from 'react';
import LoginForm from '../../components/LoginForm';
import { MainDiv, FormWrapper, H1 } from './styles';

const Login = () => (
  <MainDiv>
    <H1>Login</H1>
    <FormWrapper>
      <LoginForm />
    </FormWrapper>
  </MainDiv>
);

export default Login;
