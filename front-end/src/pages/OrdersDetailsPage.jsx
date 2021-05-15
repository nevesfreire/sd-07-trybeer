import React from 'react';
import HeaderBurguer from '../components/HeaderBurger';
import ClientOrderDetails from '../components/ClientOrderDetailsComponent';

function OrdersDetails({ match: { params: { id } } }) {
  return (
    <>
      <HeaderBurguer titulo="Detalhes de Pedido" />
      <ClientOrderDetails param={ id } />
    </>
  );
}

export default OrdersDetails;
