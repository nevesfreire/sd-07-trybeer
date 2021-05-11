import React from 'react';
import Routes from './Routes';
import BeerContextProvider from './context/BeerContextProvider';
import './App.css';

const App = () => (
  <BeerContextProvider>
    <Routes />
  </BeerContextProvider>
);

export default App;
