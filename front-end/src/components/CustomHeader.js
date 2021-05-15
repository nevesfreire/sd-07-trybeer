import React from 'react';
import PropTypes from 'prop-types';
import { Header, Container } from 'semantic-ui-react';


const CustomHeader = ({ message }) => (
  <Container style={{ margin: '40px 0' }}>
    <Header as="h1" data-testid="top-title" color="orange" textAlign="center" >
      {message}
    </Header>
  </Container>
);

CustomHeader.propTypes = {
  message: PropTypes.string.isRequired,

};

export default CustomHeader;
