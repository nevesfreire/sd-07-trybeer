import React from 'react';
import PropTypes from 'prop-types';

export default function Inputs({ value }) {
  return (
    <input type="text" value={ value } />
  );
}

Inputs.propTypes = {
  value: PropTypes.string.isRequired,
};
