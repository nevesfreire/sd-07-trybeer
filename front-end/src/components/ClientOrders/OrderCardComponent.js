import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import 'semantic-ui-css/semantic.min.css';
import { Card } from 'semantic-ui-react';

function OrderCardComponent({ sale }) {
  const {
    id,
    sale_date: saleDate,
    total_price: totalPrice,
  } = sale;

  const convertToDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/0${month}`;
  };

  return (
    <Link to={ `/orders/${id}` }>
      <Card data-testid={ `${id - 1}-order-card-container` }>
        <Card.Content>
          <Card.Description data-testid={ `${id - 1}-order-number` }>
            <span>Pedido </span>
            {id}
          </Card.Description>
          <Card.Description
            textAlign="right"
            data-testid={ `${id - 1}-order-date` }
          >
            {convertToDate(new Date(saleDate))}
          </Card.Description>
          <Card.Description data-testid={ `${id - 1}-order-total-value` }>
            <span>R$ </span>
            {totalPrice.replace('.', ',')}
          </Card.Description>
        </Card.Content>
      </Card>
    </Link>
  );
}

OrderCardComponent.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    delivery_number: PropTypes.string,
    sale_date: PropTypes.string,
    total_price: PropTypes.string,
  }).isRequired,
};

export default OrderCardComponent;
