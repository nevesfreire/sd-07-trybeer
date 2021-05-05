import React from 'react';
import SideBar from '../../Components/SideBar';
// import PropTypes from 'prop-types';

const AdminOrders = () => {
  const role = 'administrator';
  return (
    <div>
      <SideBar role={ role } />
      TELA DE PEDIDOS RECEBIDOS DO ADMINISTRADOR
    </div>
  );
};

// AdminOrders.propTypes = {};

export default AdminOrders;
