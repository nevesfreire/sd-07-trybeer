import React from 'react';
import { Container } from 'react-bootstrap';
import ClientOrders from '../../components/ClientOrders';
import Header from '../../components/Header';
import AuthVerification from '../../components/AuthVerification';

const ClientOrdersPage = () => {
  AuthVerification();

  return (
    <div>
      <Header title="Meus Pedidos" />
      <Container style={ { height: '100vh' } }>
        <ClientOrders />
      </Container>
    </div>
  );
};

export default ClientOrdersPage;
