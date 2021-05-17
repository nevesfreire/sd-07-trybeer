import React from 'react';
import AdminOrders from '../../components/AdminOrders';
import Header from '../../components/Header';
import AuthVerification from '../../components/AuthVerification';

const AdminOrdersPage = () => {
  AuthVerification();

  return (
    <div>
      <Header title="Pedidos Pendentes" />
      <AdminOrders />
    </div>
  );
};

export default AdminOrdersPage;
