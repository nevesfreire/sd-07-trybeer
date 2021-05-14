import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import AdminProfile from './pages/AdminProfile';
import Order from './pages/Order';
import Details from './pages/Details';
import AdminOrders from './pages/AdminOrders';
import AdminDetail from './pages/AdminDetail';
import PrivateRouter from './PrivateRouter';

const Routes = () => (
  <Switch>
    <Route exact path="/register" component={ SignUpForm } />
    <Route exact path="/profile" component={ Profile } />
    <Route exact path="/login" component={ Login } />
    <Route exact path="/" component={ Login } />
    <PrivateRouter exact path="/products" component={ Products } />
    <PrivateRouter exact path="/checkout" component={ Checkout } />
    <PrivateRouter exact path="/orders" component={ Order } />
    <PrivateRouter exact path="/orders/:id" component={ Details } />
    <PrivateRouter exact path="/admin/orders" component={ AdminOrders } />
    <PrivateRouter exact path="/admin/profile" component={ AdminProfile } />
    <PrivateRouter exact path="/admin/orders/:id" component={ AdminDetail } />
  </Switch>
);

export default Routes;
