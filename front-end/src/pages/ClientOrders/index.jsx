import React from 'react';
import ClientOrders from '../../components/ClientOrders';
import MenuBurger from '../../components/Menu';
import { MainDiv, FormWrapper, H1 } from './styles';
import AuthVerification from '../../components/AuthVerification';

const ClientOrdersPage = () => {
  AuthVerification();

  return (
    <MainDiv>
      <MenuBurger />
      <H1 data-testid="top-title">Meus pedidos</H1>
      <FormWrapper>
        <ClientOrders />
      </FormWrapper>
    </MainDiv>
  )
};

export default ClientOrdersPage;