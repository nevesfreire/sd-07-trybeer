import PropTypes from 'prop-types';
import React from 'react';
import logo from './buyBeer.png';

const Logo = (props) => {
  const { width, height } = props;
  return (
    <img src={ logo } alt="logo - BuyBeer" width={ width } height={ height } />
  );
};

Logo.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default Logo;

