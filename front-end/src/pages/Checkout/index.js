import React from 'react';
import Header from '../../components/Header';
import CheckoutCart from '../../components/CheckoutCart';
import AuthVerification from '../../components/AuthVerification';

const Checkout = () => {
  AuthVerification();

  return (
    <>
      <Header title="Finalizar Pedido" />
      <CheckoutCart />
    </>
  );
};

export default Checkout;
