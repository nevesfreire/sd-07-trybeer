import React from 'react';
import PropTypes from 'prop-types';

function OrderCard({ id, price, orderDateOrStatus }) {

  const idConfig = () => {
    const oneDecimalNum = 9;
    const twoDecimalNum = 99;
    if (id > oneDecimalNum) return `0${id}`;
    if (id > twoDecimalNum) return id;
    return `00${id}`;
  };

  return (
    <div>
      <p>{ `Pedido ${idConfig()}`}</p>
      <p>{ `R$ ${price}` }</p>
      <p>{ orderDateOrStatus }</p>
    </div>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  orderDateOrStatus: PropTypes.string.isRequired,
};

export default OrderCard;
