import React from 'react';
import PropTypes from 'prop-types';

export default function Texts({ value }) {
  return (
    <p>{ value }</p>
  );
}

Texts.propTypes = {
  value: PropTypes.string.isRequired,
};
