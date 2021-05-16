import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const moment = require('moment');

const OrderCard = ({
  deliveryNumber,
  saleDate,
  totalPrice,
  position,
}) => (
  <div className="container-card">
    <Link to={ `orders/${deliveryNumber}` }>
      <div className="header-card">
        <div data-testid={ `${position}-order-number` }>
          Pedido:
          {deliveryNumber}
        </div>
        <div data-testid={ `${position}-order-date` }>
          Data:
          {moment.utc(saleDate).format('MM/DD/YYYY')}
        </div>
      </div>
      <div
        className="body-card"
        data-testid={ `${position}-order-total-value` }
      >
        R$
        {totalPrice}
      </div>
    </Link>
  </div>
);

OrderCard.propTypes = {
  deliveryNumber: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
};

export default OrderCard;
