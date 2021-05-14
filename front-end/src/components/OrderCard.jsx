import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function OrderCard({ id, price, date }) {
  const idConfig = () => {
    const oneDecimalNum = 9;
    const twoDecimalNum = 99;
    if (id > oneDecimalNum) return `0${id}`;
    if (id > twoDecimalNum) return id;
    return `00${id}`;
  };

  return (
    <div
      data-testid="0-order-card-container"
    >
      <Link to={ `/orders/${id}` }>
        <p data-testid="0-order-number">{ `Pedido ${idConfig()}`}</p>
        <p data-testid="0-order-total-value">{ `R$ ${price}` }</p>
        <p data-testid="0-order-date">{ date }</p>
      </Link>
    </div>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

export default OrderCard;
