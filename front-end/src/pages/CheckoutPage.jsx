import React from 'react';
import { Redirect } from 'react-router-dom';
import CartItems from '../components/CartItems';
import HeaderBurguer from '../components/HeaderBurger';

function Checkout() {
  const client = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <HeaderBurguer
        titulo="Finalizar Pedido"
        data-testid="top-title"
      />
      { !client || !client.token ? <Redirect to="/login" /> : <CartItems /> }
    </>
  );
}

export default Checkout;
