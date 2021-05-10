import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Buttons } from './index';
import TrybeerContext from '../context/TrybeerContext';

export default function Counts({ price, index }) {
  const { priceCar, setPriceCar } = useContext(TrybeerContext);
  const [count, setCount] = useState(0);
  const AUX_NUMBER = 1;

  const countSum = () => {
    setCount(count + AUX_NUMBER);
    setPriceCar(priceCar + (AUX_NUMBER * price));
  };

  const countSub = () => {
    if (count > 0) {
      setCount(count - 1);
      return setPriceCar(priceCar - (AUX_NUMBER * price));
    }

    setCount(0);
  };

  useEffect(() => {
    localStorage.setItem('car', priceCar < 0 ? -AUX_NUMBER * priceCar : priceCar);
    setPriceCar(Number.parseFloat(localStorage.getItem('car')));
  }, [count]);

  return (
    <div>
      <Buttons
        testid={ `${index}-product-minus` }
        value="-"
        countClick={ countSub }
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
        countClick={ countSum }
      />
    </div>
  );
}

Counts.propTypes = {
  price: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
