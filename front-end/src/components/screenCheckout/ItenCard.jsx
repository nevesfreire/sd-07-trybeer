import React from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../../hooks';

export default function CardButtons({ obj, index }) {
  const [storageState, setStorage] = useLocalStorage('shoppingCart');
  const { id, price, name } = obj;
  const decrement = () => {
    setStorage((storage) => {
      const newStorage = storage;
      delete newStorage[id];
      return (newStorage);
    });
  };

  const total = storageState[id] * price;

  return (
    <div>
      <h4 data-testid={ `${index}-product-qtd-input` }>{ storageState[id] }</h4>
      <h4 data-testid={ `${index}-product-name` }>{ name }</h4>
      <h4 data-testid={ `${index}-product-total-value` }>{ `R$ ${total.toFixed(2)}` }</h4>
      <h4 data-testid={ `${index}-product-unit-price` }>{ `R$ ${price} un` }</h4>
      <button
        type="button"
        onClick={ decrement }
        data-testid={ `${index}-removal-button` }
      >
        X
      </button>
    </div>
  );
}

CardButtons.propTypes = {
  obj: PropTypes.isRequired,
  index: PropTypes.number.isRequired,
};
