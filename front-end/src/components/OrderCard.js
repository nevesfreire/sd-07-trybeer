import React from 'react';
import { PropTypes } from 'prop-types';

const OrderCard = ({ deliveryNumber, saleDate, totalPrice }) => (
  <div className="container-card">
    <div className="header-card">
      <div>
        Pedido:
        {deliveryNumber}
      </div>
      <div>
        Data:
        {saleDate}
      </div>
    </div>
    <div className="body-card">
      R$
      {totalPrice}
    </div>
  </div>

);

OrderCard.propTypes = {
  deliveryNumber: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default OrderCard;
