import React from 'react';
import Header from '../../components/Header';
import ClientOrderDetails from '../../components/ClientOrderDetails';
import AuthVerification from '../../components/AuthVerification';

const ClientOrderDetailsPage = () => {
  AuthVerification();

  return (
    <div className="d-flex flex-column align-items-center" style={ { marginTop: '5vh' } }>
      <Header title="Detalhes do Pedido" />
      <ClientOrderDetails />
    </div>
  );
};

export default ClientOrderDetailsPage;
