import React from 'react';
import PropTypes from 'prop-types';

export default function Buttons({ value, countClick, testid, disable }) {
  return (
    <button
      data-testid={ testid }
      type="button"
      disabled={ disable }
      onClick={ () => countClick() }
    >
      { value }
    </button>
  );
}

Buttons.propTypes = {
  value: PropTypes.string.isRequired,
  countClick: PropTypes.func.isRequired,
  testid: PropTypes.string.isRequired,
  disable: PropTypes.bool,
};

Buttons.defaultProps = {
  disable: false,
};
