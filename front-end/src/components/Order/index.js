import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Order({ order, index }) {
  return (
    <Link
      to={ `/orders/${order.id}` }
      data-testid={ `${index}-order-card-container` }
    >
      <p data-testid={ `${index}-order-number` }>
        Nro:
        {order.delivery_number}
      </p>
      <p data-testid={ `${index}-order-date` }>
        Data:
        {order.sale_date}
      </p>
      <p data-testid={ `${index}-order-total-value` }>
        Valor:
        {order.total_price}
      </p>
    </Link>
  );
}

Order.propTypes = {
  order: PropTypes.objectOf(),
  index: PropTypes.number,
}.isRequired;

export default Order;
