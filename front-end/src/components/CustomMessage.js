import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Message } from 'semantic-ui-react';

const CustomMessage = ({ children }) => {
  render();
  return (
    <Message>
      { children }
    </Message>
  );
};

CustomMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomMessage;
