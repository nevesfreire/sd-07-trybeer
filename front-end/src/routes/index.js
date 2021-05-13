import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { Login, Register, Product, CHeckout } from '../pages';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <PrivateRoute exact path="/products" component={ Product } />
      <PrivateRoute exact path="/checkout" component={ CHeckout } />
    </Switch>
  </Router>
);

export default Routes;
