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
} from '../pages';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/profile" component={ Profile } />
        <Route path="/products" component={ Products } />
        <Route path="/checkout" component={ Checkout } />
        <Route path="/admin/profile" component={ AdminProfile } />
        <Route path="/admin/orders" component={ AdminOrders } />
        <Route path="/orders/:id" component={ OrdersDetails } />
        <Route path="/orders" component={ Orders } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
