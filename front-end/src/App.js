import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { RegisterPage, LoginPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route path="/login" component={ LoginPage } />
        <Route path="/register" component={ RegisterPage } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
