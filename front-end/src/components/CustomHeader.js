import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

import CustomTopMenu from './CustomTopMenu';

const CustomHeader = ({ message }) => (
  <Header as="h1" color="orange" textAlign="center">
    <CustomTopMenu />
    <div data-testid="top-title">
      {message}
    </div>
  </Header>
);

CustomHeader.propTypes = {
  message: PropTypes.element.isRequired,
};

export default CustomHeader;
