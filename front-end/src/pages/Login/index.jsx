import React from 'react';
import LoginForm from '../../components/LoginForm';
import MenuBurger from '../../components/Menu'
// import CreateUserForm from '../../components/CreateUserForm';
import { MainDiv, FormWrapper, H1 } from './styles';

const Login = () => {
  return (
    <MainDiv>
      <MenuBurger />
      <H1>Login</H1>
      <FormWrapper>
        <LoginForm />
      </FormWrapper>
    </MainDiv>
  );
};

export default Login;
