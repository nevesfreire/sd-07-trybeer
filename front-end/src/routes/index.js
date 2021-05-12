import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Register, Product, ProfileAdmin } from '../pages';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/products" component={ Product } />
      <Route exact path="/admin/order" component={ ProfileAdmin } />
      <Route exact path="/admin/profile" component={ ProfileAdmin } />
    </Switch>
  </Router>
);

export default Routes;
