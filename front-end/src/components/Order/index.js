import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles.css';

function Order({ order, index }) {
  const fullDate = order.sale_date.split('T');
  const date = fullDate[0].split('-');
  const dateFormated = `${date[2]}/${date[1]}`;
  const formatedTotal = order.total_price.replace(/\./g, ',');

  return (
    <Link
      className="order-card"
      to={ `/orders/${order.id}` }
      data-testid={ `${index}-order-card-container` }
    >
      <div>
        <strong data-testid={ `${index}-order-number` }>{`Pedido ${order.id}`}</strong>
        <p data-testid={ `${index}-order-date` }>{`Data: ${dateFormated}`}</p>
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
