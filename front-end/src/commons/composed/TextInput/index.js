import React from 'react';
import PropTypes from 'prop-types';

function TextInput({ textLabel, type, name, value, placeholder, dataTestId, setValue }) {
  return (
    <label htmlFor={ dataTestId }>
      {textLabel}
      <input
        type={ type }
        name={ name }
        value={ value }
        placeholder={ placeholder }
        data-testid={ dataTestId }
        onChange={ ({ target }) => setValue(target.value) }
      />
    </label>
  );
}

TextInput.propTypes = {
  textLabel: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default TextInput;
