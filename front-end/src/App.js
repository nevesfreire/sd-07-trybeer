import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { RegisterPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={ RegisterPage } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
