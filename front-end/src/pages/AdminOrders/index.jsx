import React from 'react';
import AdminOrders from '../../components/AdminOrders';
import MenuBurger from '../../components/Menu';
import { MainDiv, FormWrapper, H1 } from './styles';
import AuthVerification from '../../components/AuthVerification';

const AdminOrdersPage = () => {
  AuthVerification();

  return (
    <MainDiv>
      <MenuBurger />
      <H1 data-testid="top-title">Pedidos Pendentes</H1>
      <FormWrapper>
        <AdminOrders />
      </FormWrapper>
    </MainDiv>
  );
};

export default AdminOrdersPage;
