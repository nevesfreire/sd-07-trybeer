import React from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import OrderDetailsAdmin from '../components/OrderDetailsAdmin';

const OrderDetailsAdminPage = () => {
  const TITLE = 'Detalhes dos pedidos';
  return (
    <div className="container-register">
      <Header title={ TITLE } />
      <Menu />
      <OrderDetailsAdmin />
    </div>
  );
};

export default OrderDetailsAdminPage;
