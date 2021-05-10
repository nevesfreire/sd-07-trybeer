import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import OrderCard from './OrderCard';
import { fetchOrders } from '../services/api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const history = useHistory();

  const getOrders = async () => {
    const ordersList = await fetchOrders();
    setOrders(ordersList);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      history.push('/login');
    } else {
      if (user.role === 'administrator') setIsAdmin(true);
      getOrders();
    }
  }, []);

  return (
    <div>
      {
        (orders.length)
          ? orders
            .map((order, index) => (
              <OrderCard
                key={ order.id }
                order={ order }
                isAdmin={ isAdmin }
                index={ index }
              />
            ))
          : <div>Não há pedidos</div>
      }
    </div>
  );
}

export default Orders;
