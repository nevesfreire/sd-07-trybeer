import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import BeerAppContext from '../../context/BeerAppContext';

function DetailsCard({ product }) {
  const { convertPrice } = useContext(BeerAppContext);
  const totalValue = product.quantity * product.price;
  return (
    <p>
      <span data-testid={ `${product.id - 1}-product-qtd` }>
        {`${product.quantity}-`}
      </span>
      <span data-testid={ `${product.id - 1}-product-name` }>{product.name}</span>
      <span data-testid={ `${product.id - 1}-product-total-value` }>
        {convertPrice(totalValue)}
      </span>
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
};

export default DetailsCard;
