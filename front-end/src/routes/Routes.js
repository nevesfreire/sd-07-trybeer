import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login, Register, Profile } from '../pages';
import TestPage from '../pages/TestPage';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/profile" component={ Profile } />
        <Route path="/test" component={ TestPage } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
