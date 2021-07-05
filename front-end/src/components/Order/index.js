import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles.css';

function Order({ order, index }) {
  const formatDate = () => {
    const date = new Date(order.sale_date);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  };
  const formatedTotal = order.total_price.replace(/\./g, ',');

  return (
    <Link
      className="order-card"
      to={ `/orders/${order.id}` }
      data-testid={ `${index}-order-card-container` }
    >
      <div>
        <strong data-testid={ `${index}-order-number` }>{`Pedido ${order.id}`}</strong>
        <p data-testid={ `${index}-order-date` }>{`Data: ${formatDate()}`}</p>
      </div>
      <h3 data-testid={ `${index}-order-total-value` }>{`Valor: R$ ${formatedTotal}`}</h3>
    </Link>
  );
}

Order.propTypes = {
  order: PropTypes.objectOf(),
  index: PropTypes.number,
}.isRequired;

export default Order;
