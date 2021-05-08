import React from 'react';
import PropTypes from 'prop-types';

export default function Inputs({ value, testid }) {
  return (
    <input
      data-testid={ testid }
      type="number"
      value={ `${value}` }
    />
  );
}

Inputs.propTypes = {
  value: PropTypes.number.isRequired,
  testid: PropTypes.string.isRequired,
};
