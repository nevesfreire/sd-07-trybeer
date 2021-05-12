import React from 'react';
import PropTypes from 'prop-types';

function OrderCard({ id, price, orderDateOrStatus }) {
  return (
    <div>
      <p>{ `Pedido ${id}`}</p>
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
