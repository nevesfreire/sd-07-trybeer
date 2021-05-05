import React from 'react';
// import { useEffect, useState, useCallback } from 'react';
import Global from './index';

const Provider = ({ children }) => (
  <Global.Provider>{children}</Global.Provider>
);

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
