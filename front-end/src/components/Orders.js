import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import { fetchOrders } from '../services/api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const getOrders = async () => {
    const ordersList = await fetchOrders();
    setOrders(ordersList);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'administrator') setIsAdmin(true);
    getOrders();
  }, []);

  return (
    <div>
      {
        (orders)
          ? orders
            .map((order) => (
              <OrderCard key={ order.id } order={ order } isAdmin={ isAdmin } />
            ))
          : <div>Carregando...</div>
      }
    </div>
  );
}

export default Orders;
