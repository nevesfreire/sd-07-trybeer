import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/user/Products';
import AdminOrders from './pages/admin/AdminOrders';
import Home from './pages/Home';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import OrdersId from './pages/user/OrdersId';
import Checkout from './pages/user/Checkout';
import AdminProfile from './pages/admin/AdminProfile';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/products" component={ Products } />
      <Route exact path="/orders" component={ Orders } />
      <Route path="/orders/:id" component={ OrdersId } />
      <Route path="/profile" component={ Profile } />
      <Route path="/checkout" component={ Checkout } />
      <Route path="/admin/orders" component={ AdminOrders } />
      <Route path="/admin/profile" component={ AdminProfile } />
    </Switch>
  );
}

export default App;
