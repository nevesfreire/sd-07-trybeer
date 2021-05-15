import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { Message } from 'semantic-ui-react';

const CustomMessage = ({ children }) => {
  render();
  return (
    <Message compact color="orange" style={ { backgroundColor: 'rgb(33, 33, 33)' } }>
      { children }
    </Message>
  );
};

CustomMessage.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CustomMessage;
