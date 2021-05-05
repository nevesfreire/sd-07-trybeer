import React from 'react';
import Routes from './Routes';
import BeerContextProvider from './context/BeerContextProvider';

const App = () => (
  <BeerContextProvider>
    <Routes />
  </BeerContextProvider>
);

export default App;
