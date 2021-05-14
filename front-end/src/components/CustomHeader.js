import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';


const CustomHeader = ({ message }) => (
  <Header data-testid="top-title" as="h1" color="orange" textAlign="center">
    {message}
  </Header>
);

CustomHeader.propTypes = {
  message: PropTypes.string.isRequired,

};

export default CustomHeader;
