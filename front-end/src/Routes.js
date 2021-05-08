import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  Login,
  Register,
  ProductsOrCheckout,
  ClientProfile,
  AdmProfile,
  AdmOrders,
  Order,
  OrderDetails,
} from './pages';

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={ () => <Redirect to="/login" /> } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/profile" component={ ClientProfile } />
      <Route exact path="/products" component={ ProductsOrCheckout } />
      <Route exact path="/checkout" component={ ProductsOrCheckout } />
      <Route exact path="/orders" component={ Order } />
      <Route
        exact
        path="/orders/:id"
        render={ (props) => <OrderDetails { ...props } /> }
      />
      <Route exact path="/admin/profile" component={ AdmProfile } />
      <Route exact path="/admin/orders" component={ AdmOrders } />
      <Route exact path="/admin/orders/:id" />
    </Switch>
  );
}

export default Router;
