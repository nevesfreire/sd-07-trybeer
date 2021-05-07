import React from 'react';

function ProductsButtons(props) {
  const { quantity, add, remove } = props;
  return (
    <>
      <button
        type="button"
        data-testid="0-product-minus"
        onclick={remove}
      >
        -
      </button>
      <span
        data-testid="0-product-qtd"
      >
        {quantity}
      </span>
      <button
        type="button"
        data-testid="0-product-plus"
        onclick={add}
      >
        +
      </button>
    </>
  );
}

export default ProductsButtons;
