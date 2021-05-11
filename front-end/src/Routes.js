import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Products from './pages/Products';
import Admin from './pages/Admin';

const Routes = () => (
  <Switch>
    <Route exact path="/register" component={ SignUpForm } />
    <Route exact path="/profile" component={ Profile } />
    <Route exact path="/login" component={ Login } />
    <Route exact path="/" component={ Login } />
    <Route exact path="/products" component={ Products } />
    <Route exact path="/admin" component={ Admin } />
    <Route exact path="/admin/orders" />
    <Route exact path="/admin/profile" />
    <Route exact path="/checkout" />
  </Switch>
);

export default Routes;
