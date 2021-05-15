import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import CheckoutCart from '../../components/CheckoutCart';
import AuthVerification from '../../components/AuthVerification';

const Checkout = () => {
  AuthVerification();

  return (
    <Container style={ { height: '100vh' } }>
      <Header title="Finalizar Pedido" />
      <CheckoutCart />
    </Container>
  );
};

export default Checkout;
