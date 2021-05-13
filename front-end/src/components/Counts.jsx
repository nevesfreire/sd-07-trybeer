import React, { useState, useContext } from 'react';
import { Buttons } from './index';
import TrybeerContext from '../context/TrybeerContext';

export default function Counts(props) {
  const [countsState] = useState(props);
  const { product, index } = countsState;
  const { dispatchShoppingCart } = useContext(TrybeerContext);
  const [count, setCount] = useState(0);
  const INC_NUMBER = 1;

  const incCount = () => {
    dispatchShoppingCart({
      type: count === 0 ? 'addProduct' : 'incrementProduct',
      payload: product,
    });
    setCount(count + INC_NUMBER);
  };

  const decCouunt = () => {
    if (!count) return;
    dispatchShoppingCart({
      type: count === 1 ? 'delProduct' : 'decrementProduct',
      payload: product,
    });
    setCount(count - INC_NUMBER);
  };

  return (
    <div>
      <Buttons
        testid={ `${index}-product-minus` }
        value="-"
        countClick={ decCouunt }
      />
      {' '}
      <span
        data-testid={ `${index}-product-qtd` }
      >
        { count }
      </span>
      {' '}
      <Buttons
        testid={ `${index}-product-plus` }
        value="+"
        countClick={ incCount }
      />
    </div>
  );
}
