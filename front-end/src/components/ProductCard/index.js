import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { Context } from '../../context';
import './styles.css';

function ProductCard({
  data: {
    id,
    name,
    price,
    url_image: urlImage,
  },
}) {
  const [quantity, setQuantity] = useState(0);
  const ctx = useContext(Context);

  return (
    <article className="product-card">
      <header>
        <img
          src={ urlImage }
          alt={ name }
          data-testid={ `${id}-product-img` }
        />
      </header>
      <main>
        <strong data-testid={ `${id}-product-name` }>{name}</strong>
        <p data-testid={ `${id}-product-price` }>{price}</p>
        <div>
          <button
            type="button"
            onClick={ () => {} }
            data-testid={ `${id}-product-minus` }
          >
            -
          </button>
          <p data-testid={ `${id}-product-qtd` }>{quantity}</p>
          <button
            type="button"
            onClick={ () => {} }
            data-testid={ `${id}-product-plus` }
          >
            +
          </button>
        </div>
      </main>
    </article>
  );
}

ProductCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url_image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
