import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function OrderCard({ order, isAdmin }) {
  const {
    id,
    total_price: totalPrice,
    delivery_address: deliveryAddress,
    delivery_number: deliveryNumber,
    sale_date: saleDate,
    status,
  } = order;

  const adminRoute = (isAdmin) ? '/admin' : '';

  return (
    <Link
      to={ `${adminRoute}/orders/${id}` }
      data-testid={ `${id}-order-card-container` }
    >
      <div data-testid={ `${id}-order-number` }>{ id }</div>
      <div
        hidden={ !isAdmin }
        data-testid={ `${id}-order-address` }
      >
        { `${deliveryAddress}, ${deliveryNumber}` }
      </div>
      <div hidden={ isAdmin } data-testid={ `${id}-order-date` }>{ saleDate }</div>
      <div data-testid={ `${id}-order-total-value` }>{ totalPrice }</div>
      <div hidden={ !isAdmin } data-testid={ `${id}-order-status` }>{ status }</div>
    </Link>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    total_price: PropTypes.string.isRequired,
    delivery_address: PropTypes.string.isRequired,
    delivery_number: PropTypes.string.isRequired,
    sale_date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default OrderCard;
