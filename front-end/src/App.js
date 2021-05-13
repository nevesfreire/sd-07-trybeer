import React from 'react';
import Routes from './routes';
import { GlobalProvider } from './services/context';

function App() {
  return (
    <GlobalProvider>
      <Routes />
    </GlobalProvider>
  );
}

export default App;
