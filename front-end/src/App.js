import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';

import Provider from './store/provider';
import Header from './components/Header';

function App() {
  return (
    <Provider>
      <div>
        <BrowserRouter>
          <Header />
          <Router />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
