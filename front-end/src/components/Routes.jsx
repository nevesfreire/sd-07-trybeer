import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  Login,
  RegisterUser,
} from '../pages';

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={ () => <Redirect to="/login" /> } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ RegisterUser } />
      <Route exact path="/profile" />
      <Route exact path="/products" />
      <Route exact path="/checkout" />
      <Route exact path="/orders" />
      <Route exact path="/orders/:numero-do-pedido" />
      <Route exact path="/admin/profile" />
      <Route exact path="/admin/orders" />
      <Route exact path="/admin/orders/:id" />
    </Switch>
  );
}

export default Router;