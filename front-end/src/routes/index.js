import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Register, Orders, Profile, Products } from '../pages';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/orders" component={ Orders } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/products" component={ Products } />
    </Switch>
  </Router>
);

export default Routes;
