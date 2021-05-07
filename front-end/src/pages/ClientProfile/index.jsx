import React from 'react';
import ClientProfile from '../../components/ClientProfile';
import MenuBurger from '../../components/Menu';
// import CreateUserForm from '../../components/CreateUserForm';
import { MainDiv, FormWrapper, H1 } from './styles';

const ClientProfilePage = () => (
  <MainDiv>
    <MenuBurger />
    <H1 data-testid="top-title">Meu perfil</H1>
    <FormWrapper>
      <ClientProfile />
    </FormWrapper>
  </MainDiv>
);

export default ClientProfilePage;
