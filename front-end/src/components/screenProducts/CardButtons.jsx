import React from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../../hooks';

export default function CardButtons({ id }) {
  const [localStorageState, setStorage] = useLocalStorage('shoppingCart');

  const increment = () => {
    if (localStorageState[id]) {
      setStorage((storage) => ({ ...storage, [id]: storage[id] + 1 }));
    } else {
      setStorage((storage) => ({ ...storage, [id]: 1 }));
    }
  };

  const decrement = () => {
    if (localStorageState[id] > 1) {
      setStorage((storage) => ({ ...storage, [id]: storage[id] - 1 }));
    } else if (localStorageState[id]) {
      setStorage((storage) => {
        delete storage[id];
        return storage;
      });
    }
  };

  const quantity = localStorageState[id] || 0;

  return (
    <div>
      <button type="button" onClick={ increment }>+</button>
      <span>{quantity}</span>
      <button type="button" onClick={ decrement }>-</button>
    </div>
  );
}

CardButtons.propTypes = {
  id: PropTypes.number.isRequired,
};
