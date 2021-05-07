import React from 'react';
import ProductsButtons from './productsButtons';

function productsCard(props) {
  const {name, price, image} = props
  return (
    <>
      <span
        data-testid="0-product-price"
      >
        {price}
      </span>
      {/* <img
        src={image}
        alt={name}
        data-testid="0-product-img"
      >
        Imagem produto
      </img> */}
      <span
        data-testid="0-product-name"
      >
        {name}
      </span>
      <ProductsButtons />
      <button
        type="button"
        data-testid="checkout-bottom-btn"
      >
        Ver Carrinho
      </button>
      <span
        data-testid="checkout-bottom-btn-value"
      >
        {}
      </span>
    </>
  );
}

export default productsCard;
