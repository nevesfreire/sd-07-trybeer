import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import GlobalStyle from './globalStyles';
import { ApiProvider } from './context/apiContext';
import AppRoutes from './components/routes';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <ApiProvider>
          <AppRoutes />
        </ApiProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
