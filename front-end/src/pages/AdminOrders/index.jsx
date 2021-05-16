import React from 'react';
import AdminOrders from '../../components/AdminOrders';
import Header from '../../components/Header';
import AuthVerification from '../../components/AuthVerification';

const AdminOrdersPage = () => {
  AuthVerification();

  return (
    <div
    className="d-flex flex-column align-items-center"
    style={ { marginTop: '5vh' } }>
      <Header title="Pedidos Pendentes" />
      <AdminOrders />
    </div>
  );
};

export default AdminOrdersPage;
