import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';

import Provider from './store/provider';

function App() {
  return (
    <Provider>
      <div>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
