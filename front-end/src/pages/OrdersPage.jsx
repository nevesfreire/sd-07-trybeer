import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderBurguer from '../components/HeaderBurger';
import OrderCard from '../components/OrderCard';
import useFetch from '../hooks/useFetch';
import MainContainer from '../styled/ClientContainers.styled';

function Orders() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { getOrdersByEmail } = useFetch();
  const [orders, setOrders] = useState();

  const getOrders = async (client) => {
    const allOrders = await getOrdersByEmail(client.email, client.token);
    return setOrders(allOrders);
  };

  const handleOrders = () => {
    if (!user || !user.token) return (<Redirect to="/login" />);
    if (orders === undefined) return ('Loading...');
    return (orders.map((order, index) => (<OrderCard
      key={ order.id }
      id={ order.id }
      price={ order.price }
      date={ order.date }
      index={ index }
    />)));
  };

  useEffect(() => {
    getOrders(user);
  }, []);

  return (
    <div>
      <HeaderBurguer titulo="Meus Pedidos" />
      <MainContainer>{handleOrders()}</MainContainer>
    </div>
  );
}

export default Orders;
