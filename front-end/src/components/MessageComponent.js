import PropTypes from 'prop-types';
import React from 'react';
import { Message } from 'semantic-ui-react';

const MessageComponent = ({ children }) => <Message>{children}</Message>;

MessageComponent.propTypes = {
  children: PropTypes.string.isRequired,
};

export default MessageComponent;
