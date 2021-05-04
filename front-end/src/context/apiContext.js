import React, { createContext, useState } from 'react';

const ApiContext = createContext();

export default ApiContext;

export const ApiProvider = ({children }) => {
  const [user, setUser] = useState('hahay');

  const data = { user, setUser }

  return (
    <ApiContext.Provider value={data}>
      { children }
    </ApiContext.Provider>
  );
}