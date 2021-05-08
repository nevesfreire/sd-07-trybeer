import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Client from './pages/Cliente';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/admin" component={ Admin } />
      <Route exact path="/products" component={ Client } />
    </Switch>
  </BrowserRouter>
);

export default Routes;
