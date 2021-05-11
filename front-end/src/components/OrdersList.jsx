import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { getOrdersFromId } from '../services/Api/orders';
import OrderCard from './OrderCard';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrdersFromId(
      JSON.parse(localStorage.getItem('token')),
    ).then((r) => { console.log(r); setOrders(r); });
  }, []);
  if (!localStorage.getItem('token')) {
    return (<Redirect to="/login" />);
  }
  return (
    <div>
      <h1>Página pedidos</h1>
      {orders.map(
        (order, key) => <OrderCard data={ { order, key } } key={ key } />,
      )}
    </div>);
};
export default OrdersList;
