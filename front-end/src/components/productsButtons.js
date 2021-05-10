import React from 'react';
import PropTypes from 'prop-types';

function ProductsButtons(props) {
  const { quantity, add, remove } = props;

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
        { quantity }
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

ProductsButtons.propTypes = {
  quantity: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default ProductsButtons;
