import React from 'react';
import PropTypes from 'prop-types';

export default function PasswordInput({ dataTestid, onChange, className }) {
  return (
    <label htmlFor="password">
      Senha
      <input
        data-testid={ dataTestid }
        type="password"
        id="password"
        onChange={ onChange }
        className={ className }
      />
    </label>
  );
}

PasswordInput.defaultProps = {
  className: 'passwordClass',
};

PasswordInput.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
