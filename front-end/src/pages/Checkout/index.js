import React from 'react';
import Header from '../../components/Header';
import CheckoutCart from '../../components/CheckoutCart';
import AuthVerification from '../../components/AuthVerification';

const Checkout = () => {
  AuthVerification();

  return (
    <div className="d-flex flex-column align-items-center" style={ { marginTop: '5vh' } }>
      <Header title="Finalizar Pedido" />
      <CheckoutCart />
    </div>
  );
};

export default Checkout;
