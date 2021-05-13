import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function OrderCard({ order, position }) {
  const { id, deliveryNumber, saleDate, totalPrice } = order;

  return (
    <Link to={ `/orders/${id}` } data-testid={ `${position}-order-card-container` }>
      <span data-testid={ `${position}-order-number` }>{ deliveryNumber }</span>
      <span data-testid={ `${position}-order-date` }>
        { `${saleDate.getDay()}/${saleDate.getMonth()}` }
      </span>
      <span data-testid={ `${position}-order-total-value` }>{ totalPrice }</span>
    </Link>
  );
}

OrderCard.propTypes = {
  order: PropTypes.objectOf.isRequired,
  position: PropTypes.objectOf.isRequired,
};
