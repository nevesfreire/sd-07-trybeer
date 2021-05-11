import React from 'react';
import PropTypes from 'prop-types';

export default function CardButtons({ id, storage: state, setStorage }) {
  const increment = () => {
    if (state[id]) {
      setStorage((storage) => ({ ...storage, [id]: storage[id] + 1 }));
    } else {
      setStorage((storage) => ({ ...storage, [id]: 1 }));
    }
  };

  const decrement = () => {
    if (state[id] > 1) {
      setStorage((storage) => ({ ...storage, [id]: storage[id] - 1 }));
    } else if (state[id]) {
      setStorage((storage) => {
        delete storage[id];
        return storage;
      });
    }
  };

  const quantity = state[id] || 0;

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
  storage: PropTypes.shape({}).isRequired,
  setStorage: PropTypes.func.isRequired,
};
