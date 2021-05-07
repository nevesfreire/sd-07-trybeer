import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function SalesCar({ value }) {
  return (
    <div>
      <Link to="/salesCar"> Ver Carrinho </Link>
      <span>
        R$
        {' '}
        { Number.parseFloat(value).toFixed(2) }
      </span>
    </div>
  );
}

SalesCar.propTypes = {
  value: PropTypes.string.isRequired,
};
