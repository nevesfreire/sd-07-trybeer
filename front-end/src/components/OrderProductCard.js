import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bulma-components';

const OrderProductCard = ({ product, index }) => (
  <Card>
    <Card.Content>
      <span
        data-testid={ `${index}-product-qtd` }
      >
        {`Quantidade: ${product.quantity}`}
      </span>
      <br />
      <span
        data-testid={ `${index}-product-name` }
      >
        {`Produto: ${product.product}`}
      </span>
      <br />
      <span
        data-testid={ `${index}-product-total-value` }
      >
        {`Preço: R$ ${(
          parseFloat(product.unit_price) * parseFloat(product.quantity)
        ).toFixed(2).split('.').join(',')
        }`}
      </span>
    </Card.Content>
  </Card>

);

OrderProductCard.propTypes = {
  product: PropTypes.shape({
    product: PropTypes.string,
    unit_price: PropTypes.string,
    quantity: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default OrderProductCard;
