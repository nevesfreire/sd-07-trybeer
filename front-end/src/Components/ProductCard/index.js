import React, { useState, useContext } from 'react';
import TryBeerContext from '../../context/TryBeerContext';

const ProductCard = ({ product, index }) => {
  const { name, price, url_image } = product;
  const [quantity, setQuantity] = useState(product.quantity);
  const { updatePriceAndCart } = useContext(TryBeerContext);

  const handlePlus = () => {
    setQuantity(quantity + 1);
    updatePriceAndCart(1, index);
  }

  const handleMinus = () => {
    setQuantity(quantity - 1);
    updatePriceAndCart(-1, index);
  }

  return (
    <div>
      <h4 data-testid={`${index}-product-name`} >{ name }</h4>

      <img src={ url_image } alt={ name }
        data-testid={`${index}-product-img`}
        width="200px"
      />

      <div data-testid={`${index}-product-price`} >{ `R$ ${price.replace('.',',')}` }</div>

      <button onClick={ () => quantity > 0 && handleMinus() }
        data-testid={`${index}-product-minus`}
      >
        -
      </button>

      <div data-testid={`${index}-product-qtd`}>{ quantity }</div>

      <button onClick={ () => handlePlus() }
        data-testid={`${index}-product-plus`}
      >
        +
      </button>
    </div>
  )
}

export default ProductCard;
