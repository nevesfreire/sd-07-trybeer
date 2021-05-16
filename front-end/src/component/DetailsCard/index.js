import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import BeerAppContext from '../../context/BeerAppContext';
import './style.css';

function DetailsCard({ product }) {
  const { convertPrice } = useContext(BeerAppContext);
  const totalValue = product.quantity * product.price;
  return (
    <p className='details-card-und-container'>
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
