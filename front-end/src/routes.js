import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Admin from './pages/Admin';
import Client from './pages/Cliente';
import Profile from './pages/Profile';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/products" component={ Products } />
      <Route exact path="/product" component={ Register } />
      <Route exact path="/home" component={ Admin } />
      <Route exact path="/products" component={ Client } />
      <Route exact path="/admin/orders" component={ Admin } />
      <Route exact path="/profile" component={ Profile } />
    </Switch>
  </BrowserRouter>
);

export default Routes;
