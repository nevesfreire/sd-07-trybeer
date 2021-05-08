import React from 'react';
import PropTypes from 'prop-types';
import Global from './index';

const Provider = ({ children }) => (
  <Global.Provider>{children}</Global.Provider>
);

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
