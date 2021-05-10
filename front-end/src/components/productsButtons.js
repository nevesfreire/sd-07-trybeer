import React from 'react';
import PropTypes from 'prop-types';

function ProductsButtons(props) {
  const { quantity, add, remove, index } = props;

  return (
    <>
      <button
        type="button"
        data-testid={ `${index}-product-minus` }
        onClick={ remove }
      >
        -
      </button>
      <span
        data-testid={ `${index}-product-qtd` }
      >
        { quantity }
      </span>
      <button
        type="button"
        data-testid={ `${index}-product-plus` }
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
  index: PropTypes.number.isRequired,
};

export default ProductsButtons;
