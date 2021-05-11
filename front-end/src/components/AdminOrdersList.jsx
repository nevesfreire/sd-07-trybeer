import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { getAllOrders } from '../services/Api/orders';
import AdminOrderCard from './AdminOrderCard';

const AdminOrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders(
      JSON.parse(localStorage.getItem('token')),
    ).then((r) => { setOrders(r); console.log(r); });
  }, []);
  if (!localStorage.getItem('token')) {
    return (<Redirect to="/login" />);
  }
  return (
    <div>
      <h1>Página pedidos</h1>
      {orders.map(
        (order, key) => <AdminOrderCard data={ { order, key } } key={ key } />,
      )}
    </div>);
};
export default AdminOrdersList;
