import { createContext, useState } from 'react';

export default ApiContext = createContext();

export const ApiProvider = ({children }) => {
  const [user, setUser] = useState('hahay');

  const data = { user, setUser }

  return (
    <ApiContext.Provider value={data}>
      { children }
    </ApiContext.Provider>
  );
}