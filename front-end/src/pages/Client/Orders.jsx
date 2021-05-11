import React from 'react';
import Header from '../../components/Header';
import OrdersList from '../../components/OrdersList';

const Orders = () => (
  <div>
    <Header />
    <h1 data-testid="top-title">Meus Pedidos</h1>
    <OrdersList />
  </div>
);

export default Orders;
