import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const moment = require('moment');

const OrderCardAdmin = ({
  orderId,
  saleDate,
  totalPrice,
  position,
  street,
  houseNumber,
  status,
}) => (
  <div className="container-card">
    <Link to={ `orders/${orderId}` }>
      <div className="header-card">
        <div data-testid={ `${position}-order-number` }>
          Pedido
          {' '}
          {orderId}
        </div>
        <div data-testid={ `${position}-order-date` }>
          Data:
          {moment.utc(saleDate).format('MM/DD/YYYY')}
        </div>
      </div>
      <div data-testid={ `${position}-order-address` }>
        {`${street}, ${houseNumber}`}
      </div>
      {/* O status entregue está hard coded, refatorar com put no admin order details */}
      <div data-testid={ `${position}-order-status` }>
        {status}
        Entregue
      </div>
      <div className="body-card" data-testid={ `${position}-order-total-value` }>
        {`R$ ${totalPrice.replace('.', ',')}`}
      </div>
    </Link>
  </div>
);

OrderCardAdmin.propTypes = {
  orderId: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  street: PropTypes.number.isRequired,
  houseNumber: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
};

export default OrderCardAdmin;
