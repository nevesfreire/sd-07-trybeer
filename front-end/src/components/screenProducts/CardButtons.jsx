import React from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../../hooks';

export default function CardButtons({ id }) {
  const [storageState, setStorage] = useLocalStorage('shoppingCart');

  const increment = () => {
    if (storageState[id]) {
      setStorage((storage) => ({ ...storage, [id]: storage[id] + 1 }));
    } else {
      setStorage((storage) => ({ ...storage, [id]: 1 }));
    }
  };

  const decrement = () => {
    if (storageState[id] > 1) {
      setStorage((storage) => ({ ...storage, [id]: storage[id] - 1 }));
    } else if (storageState[id]) {
      setStorage((storage) => {
        delete storage[id];
        return storage;
      });
    }
  };

  const quantity = storageState[id] || 0;

  return (
    <div>
      <button type="button" onClick={ increment }>+</button>
      <span>{ quantity }</span>
      <button type="button" onClick={ decrement }>-</button>
    </div>
  );
}

CardButtons.propTypes = {
  id: PropTypes.number.isRequired,
};
