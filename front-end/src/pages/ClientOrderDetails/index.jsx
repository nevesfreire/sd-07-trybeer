import React from 'react';
import MenuBurger from '../../components/Menu';
import ClientOrderDetails from '../../components/ClientOrderDetails';
import { MainDiv, FormWrapper, H1 } from './styles';
import AuthVerification from '../../components/AuthVerification';

const ClientOrderDetailsPage = () => {
  AuthVerification();

  return (
    <MainDiv>
      <MenuBurger />
      <H1 data-testid="top-title">Detalhes do Pedido</H1>
      <FormWrapper>
        <ClientOrderDetails />
      </FormWrapper>
    </MainDiv>
  );
};

export default ClientOrderDetailsPage;
