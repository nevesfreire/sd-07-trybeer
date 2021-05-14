import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as pages from '../pages';

const Router = () => (
  <Switch>
    <Route path="/login" component={ pages.Login } />
    <Route path="/register" component={ pages.Register } />
    <Route path="/products" component={ pages.Products } />
    <Route path="/admin/orders" component={ pages.Orders } />
    <Route path="/orders" component={ pages.Orders } />
    <Route path="/admin/profile" component={ pages.AdminProfile } />
    <Route path="/profile" component={ pages.ClientProfile } />
    <Route path="/checkout" component={ pages.Checkout } />
    <Route exact path="/" component={ pages.Login } />
  </Switch>
);

export default Router;
