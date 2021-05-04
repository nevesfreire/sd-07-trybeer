import React, { useEffect, useState, useCallback } from 'react';
import Global from './index';

const Provider = ({ children }) => (
  <Global.Provider>{children}</Global.Provider>
);

export default Provider;
