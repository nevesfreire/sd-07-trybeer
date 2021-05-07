import React from 'react';
import PropTypes from 'prop-types';

export default function Prices({ value }) {
  return (
    <p>{ value }</p>
  );
}

Prices.propTypes = {
  value: PropTypes.string.isRequired,
};
