import React from 'react';
import ProductsButtons from './productsButtons';

function productsCard() {
  return (
    <>
      <span
        data-testid="0-product-price"
      >
        Valor produto
      </span>
      {/* <img
        src={}
        alt={}
        data-testid="0-product-img"
      >
        Imagem produto
      </img> */}
      <span
        data-testid="0-product-name"
      >
        Nome produto
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
