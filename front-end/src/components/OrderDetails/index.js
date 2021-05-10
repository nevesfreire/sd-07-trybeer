import React from 'react';
// import PropTypes from 'prop-types';

function OrderDetails({ orderDetails, index }) {
  return (
    <div>
      <p data-testid={ `${index}-product-name` }>
        Nome
        {orderDetails.name}
      </p>
      <p data-testid={ `${index}-product-qtd` }>
        Qtde
        {orderDetails.quantity}
      </p>
      <p data-testid={ `${index}-product-total-value` }>
        Total
        {orderDetails.total_item_price}
      </p>
    </div>
  );
}

export default OrderDetails;
