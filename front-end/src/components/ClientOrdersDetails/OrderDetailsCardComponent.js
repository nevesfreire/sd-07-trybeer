import React from 'react';
import PropTypes from 'prop-types';

import 'semantic-ui-css/semantic.min.css';
import { Card } from 'semantic-ui-react';

function OrderDetailsCardComponent({ sale, index }) {
  const { quantity, name, price } = sale;

  return (
    <Card data-testid={ `${index}-order-card-container` }>
      <Card.Content>
        <Card.Description data-testid={ `${index}-product-qtd` }>
          {quantity}
        </Card.Description>
        <Card.Description data-testid={ `${index}-product-name` }>
          {name}
        </Card.Description>
        <Card.Description data-testid={ `${index}-product-total-value` }>
          <span>R$ </span>
          {price.replace('.', ',')}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

OrderDetailsCardComponent.propTypes = {
  index: PropTypes.number.isRequired,
  sale: PropTypes.shape({
    delivery_number: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.string,
    sale_date: PropTypes.string,
    total_price: PropTypes.string,
  }).isRequired,
};

export default OrderDetailsCardComponent;
