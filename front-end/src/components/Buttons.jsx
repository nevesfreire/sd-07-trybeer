import React from 'react';
import PropTypes from 'prop-types';

export default function Buttons({ defaultValue, countClick, testid, disable }) {
  return (
    <button
      data-testid={ testid }
      type="button"
      disabled={ disable }
      onClick={ () => countClick() }
    >
      { defaultValue }
    </button>
  );
}

Buttons.propTypes = {
  defaultValue: PropTypes.string.isRequired,
};

/* Buttons.defaultProps = {

};
 */