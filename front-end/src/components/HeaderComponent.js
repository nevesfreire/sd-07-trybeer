import PropTypes from 'prop-types';
import React from 'react';
import { Header } from 'semantic-ui-react';

const HeaderComponent = ({ message }) => (
  <Header as="h2" color="yellow" textAlign="center">
    {message}
  </Header>
);

HeaderComponent.propTypes = {
  message: PropTypes.string.isRequired,
};

export default HeaderComponent;
