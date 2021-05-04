import React from 'react';
import LoginForm from '../../components/LoginForm';
// import CreateUserForm from '../../components/CreateUserForm';
import { MainDiv, FormWrapper, H1 } from './styles';

const Login = () => {
  return (
    <MainDiv>
      <H1>Login</H1>
      <FormWrapper>
        <LoginForm />
        {/* <CreateUserForm /> */}
      </FormWrapper>
    </MainDiv>
  );
};

export default Login;
