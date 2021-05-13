import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { dateFormat } from '../../utils';

export default function OrderClient({ index, order }) {
  return (
    <Link to={ `/orders/${order.id}` } data-testid={ `${index}-order-card-container` }>
      <h5 data-testid={ `${index}-order-number` }>{`Pedido ${order.id}`}</h5>
      <h3 data-testid={ `${index}-order-date` }>{dateFormat(order.sale_date)}</h3>
      <span data-testid={ `${index}-order-total-value` }>
        {`R$ ${order.total_price.replace('.', ',')}`}
      </span>
    </Link>
  );
}

OrderClient.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sale_date: PropTypes.string.isRequired,
    total_price: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
