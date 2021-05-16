import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function OrderDetails({ orderDetails, index, formatPrice }) {
  const {
    name,
    quantity,
    total_item_price: total,
  } = orderDetails;

  return (
    <div className="order-details-product">
      <p data-testid={ `${index}-product-name` }>{`Nome: ${name}`}</p>
      <p data-testid={ `${index}-product-qtd` }>{`Qtde: ${quantity}`}</p>
      <p data-testid={ `${index}-product-total-value` }>
        {`Total: ${formatPrice(total)}`}
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    total_item_price: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  formatPrice: PropTypes.func.isRequired,
}.isRequired;

export default OrderDetails;
