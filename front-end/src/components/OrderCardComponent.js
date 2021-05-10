import React from 'react';
import PropTypes from 'prop-types';

import 'semantic-ui-css/semantic.min.css';
import { Card } from 'semantic-ui-react';

function OrderCardComponent({ sale }) {
  const {
    id,
    delivery_number: deliveryNumber,
    sale_date: saleDate,
    total_price: totalPrice,
  } = sale;

  const convertToDate = (date) => {
    const month = date.getMonth();
    const day = date.getDate();
    return `${day}/${month}`;
  };

  return (
    <Card data-testid={ `${id - 1}-order-card-container` }>
      <Card.Content>
        <Card.Description data-testid={ `${id - 1}-order-number` }>
          <span>Pedido </span>
          {deliveryNumber}
        </Card.Description>
        <Card.Description textAlign="right" data-testid={ `${id - 1}-order-date` }>
          {convertToDate(new Date(saleDate))}
        </Card.Description>
        <Card.Description data-testid={ `${id - 1}-order-total-value` }>
          <span>R$ </span>
          {totalPrice}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

OrderCardComponent.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    delivery_number: PropTypes.number,
    sale_date: PropTypes.string,
    total_price: PropTypes.string,
  }).isRequired,
};

export default OrderCardComponent;
