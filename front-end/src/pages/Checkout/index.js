import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import CheckoutCart from '../../components/CheckoutCart';
import AuthVerification from '../../components/AuthVerification';

const Checkout = () => {
  AuthVerification();

  return (
    <div>
      <Header title="Finalizar Pedido" />
      <Container style={ { height: '100vh' } }>
        <CheckoutCart />
      </Container>
    </div>
  );
};

export default Checkout;
