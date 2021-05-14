import React from 'react';
import HeaderBurguer from '../components/HeaderBurger';
import ClientOrderDetails from '../components/ClientOrderDetailsComponent';

function OrdersDetails() {
  return (
    <>
      <HeaderBurguer titulo="Detalhes de Pedido" />
      <ClientOrderDetails />
    </>
  );
}

export default OrdersDetails;
