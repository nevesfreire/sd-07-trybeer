import React from 'react';
import PropTypes from 'prop-types';

function Card({ name, urlImage, price, id, quantity }) {
  return (
    <div key={ id }>
      <img src={ urlImage } alt={ name } />
      <span>{ name }</span>
      <span>{ price }</span>
      <span>{ quantity }</span>
      <button type="button">- 1</button>
      <button type="button">+ 1</button>
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
