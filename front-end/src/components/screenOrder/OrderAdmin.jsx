import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function OrderAdmin({ index, order }) {
  return (
    <Link
      to={ `/admin/orders/${order.id}` }
      data-testid={ `${index}-order-card-container` }
    >
      <h5 data-testid={ `${index}-order-number` }>{`Pedido ${order.delivery_number}`}</h5>
      <h4 data-testid={ `${index}-order-address` }>
        {`Pedido ${order.delivery_address}`}
      </h4>
      <h3 data-testid={ `${index}-order-status` }>{order.status}</h3>
      <span data-testid={ `${index}-order-total-value` }>
        {`R$ ${order.total_price.replace('.', ',')}`}
      </span>
    </Link>
  );
}

OrderAdmin.propTypes = {
  order: PropTypes.shape({
    delivery_number: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    delivery_address: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    total_price: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
