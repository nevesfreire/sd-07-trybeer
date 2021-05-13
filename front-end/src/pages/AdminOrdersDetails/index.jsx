import React from 'react';
import AdminOrdersDetails from '../../components/AdminOrdersDetails';
import MenuBurger from '../../components/Menu';
import { MainDiv, FormWrapper } from './styles';
import AuthVerification from '../../components/AuthVerification';

const AdminOrdersDetailsPage = () => {
  AuthVerification();

  return (
    <MainDiv>
      <MenuBurger />
      <FormWrapper>
        <AdminOrdersDetails />
      </FormWrapper>
    </MainDiv>
  );
};

export default AdminOrdersDetailsPage;
