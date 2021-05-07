import React, { useState, useEffect } from 'react';
import { Header, CardOrder } from '../../components';
import { getStorage } from '../../services/localStorage';

function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const cart = getStorage('cart');
    setOrders(cart);
  }, []);

  return (
    <div>
      <Header
        data-testid="top-title"
        headerTitle="Meus Pedidos"
      />
      {orders.map((order, index) => (
        <CardOrder
          key={ index }
          order={ order }
          index={ index }
        />
      ))}
    </div>
  );
}

export default Orders;
