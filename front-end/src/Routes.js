import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';
import Orders from './pages/Orders';
import AdminProfile from './pages/AdminProfile';
import AdminOrderDetails from './pages/AdminOrderDetails';
import AdminOrders from './pages/AdminOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/profile" component={ Profile } />
      <Route path="/products" component={ Products } />
      <Route path="/checkout" component={ Checkout } />
      <Route exact path="/orders/:numero-do-pedido" component={ withRouter(OrderDetails) } />
      <Route path="/orders" component={ Orders } />
      <Route path="/admin/profile" component={ AdminProfile } />
      <Route exact path="/admin/orders/:id" component={ withRouter(AdminOrderDetails) } />
      <Route path="/admin/orders" component={ AdminOrders } />
      <Redirect from="/" to="/login" />
    </Switch>
  );
}
