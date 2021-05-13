import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderBurguer from '../components/HeaderBurger';
import OrderCard from '../components/OrderCard';
import useFetch from '../hooks/useFetch';

function Orders() {
  const user = JSON.parse(localStorage.getItem('user'));
  // const { getOrdersByEmail } = useFetch();
  // const [orders, setOrders] = useState();

  // const getOrders = async (client) => {
  //   const allOrders = await getOrdersByEmail(client.email);
  //   return setOrders(allOrders);
  // };

  const orders = [
    { id: 1, price: 20.50, orderDate: '20/04' },
    { id: 2, price: 50.50, orderDate: '10/05' },
  ];

  // useEffect(() => {
  //   getOrders(user);
  // }, []);

  return (
    <div>
      <HeaderBurguer titulo="Meus Pedidos" />
      { !user || !user.token
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
