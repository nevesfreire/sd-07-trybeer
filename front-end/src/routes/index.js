import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Register, Product } from '../pages';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/products" component={ Product } />
    </Switch>
  </Router>
);

export default Routes;
