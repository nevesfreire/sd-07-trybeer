import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BeerAppContext from '../../context/BeerAppContext';
import { getToLocalStorage } from '../../utils/localStorage';

function DetailsCard({ product, role }) {
  const { convertPrice } = useContext(BeerAppContext);  
  const totalValue = product.quantity * product.price;
  console.log(role);
  return (
    <p>
      <span data-testid={ `${product.id - 1}-product-qtd` }>
        {`${product.quantity}-`}
      </span>
      <span data-testid={ `${product.id - 1}-product-name` }>{product.name}</span>
      <span data-testid={ `${product.id - 1}-product-total-value` }>
        {convertPrice(totalValue)}
      </span>
      { role && <span data-testid={ `${product.id - 1}-order-unit-price` }>
        {`(${convertPrice(product.price)})`}
      </span>}
    </p>
  );
}

DetailsCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  role: PropTypes.string
};

DetailsCard.defaultProps = {
  role: 'Client'
};

export default DetailsCard;
