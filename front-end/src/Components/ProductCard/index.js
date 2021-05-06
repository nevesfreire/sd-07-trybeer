import React, { useState, useContext } from 'react';
import propTypes from 'prop-types';
import TryBeerContext from '../../context/TryBeerContext';

const ProductCard = ({ product, index }) => {
  const one = 1;
  const { name, price } = product;
  const [quantity, setQuantity] = useState(product.quantity);
  const { updatePriceAndCart } = useContext(TryBeerContext);

  const handlePlus = () => {
    setQuantity(quantity + one);
    updatePriceAndCart(one, index);
  };

  const handleMinus = () => {
    setQuantity(quantity - one);
    updatePriceAndCart(-one, index);
  };

  return (
    <div>
      <h4 data-testid={ `${index}-product-name` }>{ name }</h4>

      <img
        src={ product.url_image }
        alt={ name }
        data-testid={ `${index}-product-img` }
        width="200px"
      />

      <div
        data-testid={ `${index}-product-price` }
      >
        { `R$ ${price.replace('.', ',')}` }
      </div>

      <button
        type="button"
        onClick={ () => quantity > 0 && handleMinus() }
        data-testid={ `${index}-product-minus` }
      >
        -
      </button>

      <div data-testid={ `${index}-product-qtd` }>{ quantity }</div>

      <button
        type="button"
        onClick={ () => handlePlus() }
        data-testid={ `${index}-product-plus` }
      >
        +
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  product: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    price: propTypes.number,
    url_image: propTypes.string,
    quantity: propTypes.number,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default ProductCard;
