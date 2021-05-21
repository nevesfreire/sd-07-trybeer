import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function OrderCard({ order, position }) {
  const check = moment(order.sale_date , 'YYYY/MM/DD').format('DD/MM');

  return (
    <div>
      <Link
        to={ `/orders/${order.id}` }
        data-testid={ `${position}-order-card-container` }
      >
        <p data-testid={ `${position}-order-number` }>{ `Pedido ${order.id}` }</p>
        <p data-testid={ `${position}-order-date` }>
          { check }
        </p>
        <p data-testid={ `${position}-order-total-value` }>{ order.total_price }</p>
      </Link>
    </div>
  );
}

OrderCard.propTypes = {
  order: PropTypes.objectOf.isRequired,
  position: PropTypes.objectOf.isRequired,
};
