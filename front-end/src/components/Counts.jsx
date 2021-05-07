import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Buttons, Inputs } from './index';
import TrybeerContext from '../context/TrybeerContext';

export default function Counts({ price }) {
  const { setPriceCar } = useContext(TrybeerContext);
  const [count, setCount] = useState(0);

  const countSum = () => {
    setCount(count + 1);
  };

  const countSub = () => {
    if (count > 0) return setCount(count - 1);
    setCount(0);
  };

  useEffect(() => {
    setPriceCar(count * price);
  }, [count]);

  return (
    <div>
      <Buttons value="-" countClick={ countSub } />
      <Inputs value={ count } />
      <Buttons value="+" countClick={ countSum } />
    </div>
  );
}

Counts.propTypes = {
  price: PropTypes.number.isRequired,
};
