import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function OrderCard({ id, price, date, index }) {
  console.log(price.replace('.', ','));
  // const idConfig = () => {
  //   const oneDecimalNum = 9;
  //   const twoDecimalNum = 99;
  //   if (id > oneDecimalNum) return `0${id}`;
  //   if (id > twoDecimalNum) return id;
  //   return `00${id}`;
  // };

  return (
    <Link
      to={ `/orders/${id}` }
      data-testid="0-order-card-container"
    >
      <p data-testid={ `${index}-order-number` }>{ `Pedido ${id}`}</p>
      <p data-testid={ `${index}-order-total-value` }>
        { `R$ ${price.replace('.', ',')}` }
      </p>
      <p data-testid={ `${index}-order-date` }>{ date }</p>
    </Link>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default OrderCard;
