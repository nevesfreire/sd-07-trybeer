import React from 'react';
import PropTypes from 'prop-types';

export default function EmailInput({ dataTestid, onChange, className }) {
  return (
    <label htmlFor="email">
      Email
      <input
        data-testid={ dataTestid }
        type="email"
        id="email"
        onChange={ onChange }
        className={ className }
      />
    </label>
  );
}

EmailInput.defaultProps = {
  className: 'emailClass',
};

EmailInput.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
