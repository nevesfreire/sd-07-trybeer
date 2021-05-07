import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  Login,
  Register,
  Products,
  ClientProfile,
  AdmProfile,
  AdmOrders,
} from './pages';

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={ () => <Redirect to="/login" /> } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/profile" component={ ClientProfile } />
      <Route exact path="/products" component={ Products } />
      <Route exact path="/checkout" component={ () => <div>Checkout page</div> } />
      <Route exact path="/orders" />
      <Route exact path="/orders/:numero-do-pedido" />
      <Route exact path="/admin/profile" component={ AdmProfile } />
      <Route exact path="/admin/orders" component={ AdmOrders } />
      <Route exact path="/admin/orders/:id" />
    </Switch>
  );
}

export default Router;
