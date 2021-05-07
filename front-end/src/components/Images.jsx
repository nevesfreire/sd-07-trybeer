import React from 'react';
import PropTypes from 'prop-types';

export default function Images({ value }) {
  return (
    <img src={ value } alt={ value } />
  );
}

Images.propTypes = {
  value: PropTypes.string.isRequired,
};
