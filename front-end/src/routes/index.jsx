import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Main } from '../pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Main } />
    <Route exact path="/login" component={ Login } />
    <Route exact path="/admin" />
    <Route exact path="/products" />
    <Route exact path="/register" />
  </Switch>
);

export default Routes;
