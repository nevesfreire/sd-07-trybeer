import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { Login, Register, Product, CHeckout } from '../pages';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Redirect to="/login" />
    </Route>
    <Route exact path="/login" component={ Login } />
    <Route exact path="/register" component={ Register } />
    <PrivateRoute exact path="/products" component={ Product } />
    <PrivateRoute exact path="/checkout" component={ CHeckout } />
  </Switch>
);

export default Routes;
