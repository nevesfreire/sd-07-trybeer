import React from 'react';
import PropTypes from 'prop-types';

function Card({ name, urlImage, price, id, quantity, index }) {
  return (
    <div key={ id }>
      <img src={ urlImage } alt={ name } data-testid={`${index}-product-img`} />
      <span data-testid={`${index}-product-name`}>{ name }</span>
      <span data-testid={`${index}-product-price`}>{ price }</span>
      <span data-testid={`${index}-product-qtd`}>{ quantity }</span>
      <button
        type="button"
        data-testid={`${index}-product-minus`}
      >
        -
      </button>
      <button
        type="button"
        data-testid={`${index}-product-plus`}
      >
        +
      </button>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default Card;
