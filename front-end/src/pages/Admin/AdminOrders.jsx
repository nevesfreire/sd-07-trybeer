import React from 'react';
import HeaderAdmin from '../../components/HeaderAdmin';
import AdminOrdersList from '../../components/AdminOrdersList';

const AdminOrders = () => (
  <div>
    <HeaderAdmin />
    <h1>Admin - Pedidos</h1>
    <AdminOrdersList />
  </div>);

export default AdminOrders;
