import React from 'react';
import PropTypes from 'prop-types';

export default function NameInput({ dataTestid, onChange, className }) {
  return (
    <label htmlFor="name">
      Nome
      <input
        data-testid={ dataTestid }
        type="name"
        id="name"
        onChange={ onChange }
        className={ className }
      />
    </label>
  );
}

NameInput.defaultProps = {
  className: 'nameClass',
};

NameInput.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
