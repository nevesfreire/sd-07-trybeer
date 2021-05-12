import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import ClientOrders from './pages/ClientOrders';
import OrderDetails from './pages/OrderDetails';
import AdminDetails from './pages/AdminDetails';
import AdminProfile from './pages/AdminProfile';
import AdminOrders from './pages/AdminOrders';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Home } />
    <Route path="/login" component={ Login } />
    <Route path="/register" component={ Register } />
    <Route path="/profile" component={ Profile } />
    <Route path="/products" component={ Products } />
    <Route path="/checkout" component={ Checkout } />
    <Route path="/orders/:id" component={ OrderDetails } />
    <Route path="/orders" component={ ClientOrders } />
    <Route path="/admin/orders/:id" component={ AdminDetails } />
    <Route path="/admin/profile" component={ AdminProfile } />
    <Route path="/admin/orders" component={ AdminOrders } />
  </Switch>
);

export default Routes;
