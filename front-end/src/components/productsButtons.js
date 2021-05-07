import React from 'react';

function ProductsButtons() {
  return (
    <>
      <button
        type="button"
        data-testid="0-product-minus"
        // onclick={}
      >
        -
      </button>
      <span
        data-testid="0-product-qtd"
      >
        {}
      </span>
      <button
        type="button"
        data-testid="0-product-plus"
        // onclick={}
      >
        +
      </button>
    </>
  );
}

export default ProductsButtons;
