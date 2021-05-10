import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login, Register, Products } from '../pages';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/products" component={ Products } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
