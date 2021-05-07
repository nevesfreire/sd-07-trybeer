import React from 'react';
import PropTypes from 'prop-types';

export default function Buttons({ value, countClick }) {
  return (
    <button
      type="button"
      onClick={ () => countClick() }
    >
      {value}
    </button>
  );
}

Buttons.propTypes = {
  value: PropTypes.string.isRequired,
  countClick: PropTypes.func.isRequired,
};
