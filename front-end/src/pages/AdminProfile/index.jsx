import React from 'react';
import AdminProfile from '../../components/AdminProfile';
import MenuBurger from '../../components/Menu';
import AuthVerification from '../../components/AuthVerification';
import { MainDiv, FormWrapper, H1 } from './styles';

const AdminProfilePage = () => {
  AuthVerification();

  return (
    <MainDiv>
      <MenuBurger />
      <H1 data-testid="top-title">Perfil</H1>
      <FormWrapper>
        <AdminProfile />
      </FormWrapper>
    </MainDiv>
  );
};

export default AdminProfilePage;
