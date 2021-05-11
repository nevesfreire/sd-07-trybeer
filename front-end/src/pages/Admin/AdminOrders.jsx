import React from 'react';
import AdminOrdersList from '../../components/AdminOrdersList';
import Header from '../../components/Header';

const AdminProfile = () => (
  <div>
    <Header />
    <h1>Admin - Pedidos</h1>
    <AdminOrdersList />
  </div>);

export default AdminProfile;
