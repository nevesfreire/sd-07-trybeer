import React from 'react';
import SideBar from '../../Components/SideBar';
// import PropTypes from 'prop-types';

const AdminOrderDetail = () => {
  const role = 'administrator';
  return (
    <div>
      <SideBar role={ role } />
      TELA DE DETALHES DO PEDIDO DO ADMINISTRADOR
    </div>
  );
};

// AdminOrderDetail.propTypes = {};

export default AdminOrderDetail;
