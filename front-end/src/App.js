import React from 'react';
import Routes from './Routes';
import CentralContextProvider from './context/CentralContextProvider';

const App = () => (
  <CentralContextProvider>
    <Routes />
  </CentralContextProvider>);


export default App;
