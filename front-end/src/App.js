import React from 'react';
import Provider from './context/Provider';
import Routes from './routes';
import Header from './components/Header';
import './css/styles.css';

function App() {
  return (
    <Provider>
      <Header />
      <Routes />
    </Provider>
  );
}

export default App;
