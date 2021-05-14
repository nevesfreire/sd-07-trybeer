import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Main,
  Register,
  Products,
  ProfileUser,
  OrdersAdmin,
  ProfileAdmin,
  CheckoutUser,
  OrderDetailsUser,
  OrderDetailsAdmin,
  OrdersUser } from '../pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Main } />
    <Route exact path="/login" component={ Login } />
    <Route exact path="/profile" component={ ProfileUser } />
    <Route exact path="/admin/orders" component={ OrdersAdmin } />
    <Route exact path="/admin/profile" component={ ProfileAdmin } />
    <Route exact path="/products" component={ Products } />
    <Route exact path="/register" component={ Register } />
    <Route exact path="/checkout" component={ CheckoutUser } />
    <Route exact path="/orders/:orderId" component={ OrderDetailsUser } />
    <Route exact path="/admin/orders/:id" component={ OrderDetailsAdmin } />
    <Route exact path="/orders" component={ OrdersUser } />
  </Switch>
);

export default Routes;
