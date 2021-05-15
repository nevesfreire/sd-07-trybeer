import React from 'react';
import HeaderBurguer from '../components/HeaderBurger';
import PendingOrdersComponent from '../components/PendingOrdersComponent';

function PendingOrders() {
  return (
    <>
      <HeaderBurguer titulo="TryBeer" isAdmin />
      <PendingOrdersComponent />
    </>
  );
}

export default PendingOrders;
