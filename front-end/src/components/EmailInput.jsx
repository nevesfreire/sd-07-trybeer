import React from 'react';
import PropTypes from 'prop-types';

export default function EmailInput({ dataTestid, onChange, className, readonly, value }) {
  return (
    <label htmlFor="email">
      Email
      <input
        data-testid={ dataTestid }
        type="email"
        id="email"
        value={ value }
        onChange={ onChange }
        className={ className }
        readOnly={ readonly }
      />
    </label>
  );
}

EmailInput.defaultProps = {
  className: 'emailClass',
  readonly: false,
  value: '',
  onChange: () => {},
};

EmailInput.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  readonly: PropTypes.bool,
  value: PropTypes.string,
};
