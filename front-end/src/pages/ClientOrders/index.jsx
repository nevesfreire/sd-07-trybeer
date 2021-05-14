import React from 'react';
import ClientOrders from '../../components/ClientOrders';
import Header from '../../components/Header';
import AuthVerification from '../../components/AuthVerification';

const ClientOrdersPage = () => {
  AuthVerification();

  return (
    <div>
      <Header title="Meus Pedidos" />
      <ClientOrders />
    </div>
  );
};

export default ClientOrdersPage;
