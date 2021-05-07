import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Main, Register, Products } from '../pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Main } />
    <Route exact path="/login" component={ Login } />
    <Route exact path="/admin" />
    <Route exact path="/products" component={ Products } />
    <Route exact path="/register" component={ Register } />
  </Switch>
);

export default Routes;
