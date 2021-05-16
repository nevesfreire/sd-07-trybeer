import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function AdminCardDetails({ data, index }) {
  const { quantity, name, price } = data;

  const priceFormat = `R$ ${price.replace(/\./g, ',')}`;
  const productTotalPrice = parseFloat(quantity) * parseFloat(price);
  const productTotalPriceFormat = `R$ ${productTotalPrice.toFixed(2)
    .replace(/\./g, ',')}`;

  return (
    <article className="admin-product-card">
      <div>
        <p data-testid={ `${index}-product-qtd` }>{quantity}</p>
        <p data-testid={ `${index}-product-name` }>{name}</p>
      </div>
      <div>
        <p data-testid={ `${index}-product-total-value` }>{productTotalPriceFormat}</p>
        <strong data-testid={ `${index}-order-unit-price` }>{`(${priceFormat})`}</strong>
      </div>
    </article>
  );
}

AdminCardDetails.propTypes = {
  data: PropTypes.shape({
    quantity: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    delivery_number: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default AdminCardDetails;
