import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PendingOrderCard({ order, index }) {
  return (
    <Link to={ `/admin/orders/${order.id}` }>
      <div>
        <h3
          data-testid={ `${index}-order-number` }
        >
          { `Pedido ${order.id}` }
        </h3>
        <span
          data-testid={ `${index}-order-address` }
        >
          { `${order.delivery_address}, ${order.delivery_number}` }
        </span>
      </div>
      <div>
        <span
          data-testid={ `${index}-order-total-value` }
        >
          { `R$ ${order.total_price}` }
        </span>
        <span
          data-testid={ `${index}-order-status` }
        >
          { order.status }
        </span>
      </div>
    </Link>
  );
}

PendingOrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    total_price: PropTypes.number.isRequired,
    delivery_address: PropTypes.string.isRequired,
    delivery_number: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default PendingOrderCard;
