import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import Login from './pages/Login';

const Routes = () => (
  <Switch>
    <Route exact path="/register" component={ SignUpForm } />
    <Route path="/login" component={ Login } />
    <Route path="/" component={ Login } />
    <Route path="/products" />
    <Route path="/admin/orders" />
  </Switch>
);

export default Routes;
