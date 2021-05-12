import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderBurguer from '../components/HeaderBurger';
import OrderCard from '../components/OrderCard';
import useFetch from '../hooks/useFetch';

function Orders() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { getOrdersByEmail } = useFetch();
  const [orders, setOrders] = useState();

  const getOrders = async (client) => {
    const allOrders = await getOrdersByEmail(client.email);
    return setOrders(allOrders);
  };

  useEffect(() => {
    getOrders(user);
  }, []);

  return (
    <div>
      <HeaderBurguer titulo="Meus Pedidos" />
      { !client || !client.token
        ? <Redirect to="/login" />
        : orders.map((order) => (<OrderCard
          key={ order.id }
          id={ order.id }
          price={ order.price }
          date={ order.orderDate }
        />))}
    </div>
  );
}

export default Orders;
