import React from 'react';
import TopBar from '../../Components/TopBar';
// import PropTypes from 'prop-types';

const ClientOrders = () => {
  const role = 'administrator';
  return (
    <div>
      <TopBar role={ role } />
      TELA DE CHECKOUT
    </div>
  );
};

// ClientOrders.propTypes = {};

export default ClientOrders;
