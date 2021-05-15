import React from 'react';
import PropTypes from 'prop-types';
import HeaderBurguer from '../components/HeaderBurger';
import ClientOrderDetails from '../components/ClientOrderDetailsComponent';

function OrdersDetails({ match: { params: { id } } }) {
  return (
    <>
      <HeaderBurguer titulo="Detalhes de Pedido" />
      <ClientOrderDetails param={ id } />
    </>
  );
}

OrdersDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default OrdersDetails;
