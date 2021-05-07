import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Main, Register, ProfileUser } from '../pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Main } />
    <Route exact path="/login" component={ Login } />
    <Route exact path="/profile" component={ ProfileUser } />
    <Route exact path="/admin" />
    <Route exact path="/products" />
    <Route exact path="/register" component={ Register } />
  </Switch>
);

export default Routes;
