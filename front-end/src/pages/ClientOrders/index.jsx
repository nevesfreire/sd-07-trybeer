import React from 'react';
import ClientOrders from '../../components/ClientOrders';
import Header from '../../components/Header';
import AuthVerification from '../../components/AuthVerification';

const ClientOrdersPage = () => {
  AuthVerification();

  return (
    <div
    className="d-flex flex-column align-items-center"
    style={ { marginTop: '5vh' } }>
      <Header title="Meus Pedidos" />
      <ClientOrders />
    </div>
  );
};

export default ClientOrdersPage;
