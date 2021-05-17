import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import ClientOrderDetails from '../../components/ClientOrderDetails';
import AuthVerification from '../../components/AuthVerification';

const ClientOrderDetailsPage = () => {
  AuthVerification();

  return (
    <div>
      <Header title="Detalhes do Pedido" />
      <Container style={ { height: '100vh' } }>
        <ClientOrderDetails />
      </Container>
    </div>
  );
};

export default ClientOrderDetailsPage;
