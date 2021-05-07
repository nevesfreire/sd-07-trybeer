import React from 'react';
import MenuTop from '../components/MenuTop';
import Orders from '../components/Orders';

function OrdersPage() {
  return (
    <div>
      <MenuTop title="Meus Pedidos" />
      <Orders />
    </div>
  );
}

export default OrdersPage;
