import React from 'react';
import PropTypes from 'prop-types';

export default function Card({ product, index }) {
  return (
    <>
      <h4 data-testid={ `${index}-product-name` }>{ product.name }</h4>
      <h5
        data-testid={ `${index}-product-price` }
      >
        {
          // product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          `R$ ${product.price.replace('.', ',')}`
        }
      </h5>
      <img
        src={ product.url_image }
        alt="foto da bebida"
        data-testid={ `${index}-product-img` }
      />
    </>
  );
}

Card.propTypes = {
  product: PropTypes.shape({
    url_image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
