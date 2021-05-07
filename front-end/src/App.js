import React from 'react';
import './App.css';
import GlobalStyle from './globalStyles';
import ApiProvider from './context/apiContext';
import AppRoutes from './components/routes';

function App() {
  return (
    <>
      <GlobalStyle />
      <ApiProvider>
        <AppRoutes />
      </ApiProvider>
    </>
  );
}

export default App;
