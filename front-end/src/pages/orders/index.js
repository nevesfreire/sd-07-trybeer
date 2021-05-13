import React from 'react';
import TopMenu from '../../components/Header';

export default function Orders() {
  return (
    <div>
      <TopMenu>Meus Pedidos</TopMenu>
      <div className="div-order-card">
        {orders && orders.map((order) => (
          <div key={ order.id }>
            <OrderCard />
          </div>
        ))}
      </div>
    </div>
  );
}
