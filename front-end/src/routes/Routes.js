import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  Login,
  Register,
  Products,
  Checkout,
  Profile,
  Orders,
  OrdersDetails,
  AdminProfile,
  AdminOrders,
  AdminOrdersDetails,
} from '../pages';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/products" component={ Products } />
        <Route exact path="/checkout" component={ Checkout } />
        <Route exact path="/orders/:id" component={ OrdersDetails } />
        <Route exact path="/orders" component={ Orders } />
        <Route exact path="/admin/profile" component={ AdminProfile } />
        <Route exact path="/admin/orders/:id" component={ AdminOrdersDetails } />
        <Route exact path="/admin/orders" component={ AdminOrders } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
