import React, { useState } from 'react';
import trybeerContext from './TrybeerContext';

function Provider ({children}) {

  const valueProvider = {
  };

  return (
    <trybeerContext.Provider value={ valueProvider }>
      {children}
    </trybeerContext.Provider>
  );
};

export default Provider;