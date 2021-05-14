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
    <Link to={ `/orders/${id}` }>
      <div>
        <p>{ `Pedido ${idConfig()}`}</p>
        <p>{ `R$ ${price}` }</p>
        <p>{ date }</p>
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

export default OrderCard;
