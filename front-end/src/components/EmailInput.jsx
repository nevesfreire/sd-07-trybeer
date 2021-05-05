import React from 'react';
import PropTypes from 'prop-types';

export default function PasswordInput({ dataTestid, onChange, className }) {
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

PasswordInput.defaultProps = {
  className: 'emailClass',
};

PasswordInput.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
