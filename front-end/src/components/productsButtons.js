import React from 'react';

function ProductsButtons(props) {
  const { quantity, add, remove } = props;

  console.log('vai');
  return (
    <>
      <button
        type="button"
        data-testid="0-product-minus"
        onClick={ remove }
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
        onClick={ add }
      >
        +
      </button>
    </>
  );
}

export default ProductsButtons;
