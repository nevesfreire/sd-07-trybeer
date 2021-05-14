import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Register from './pages/Register';
import Products from './pages/Client/Products';
import Checkout from './pages/Client/Checkout';
import Profile from './pages/Client/Profile';
import Orders from './pages/Client/Orders';
import OrdersDetails from './pages/Client/OrdersDetails';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/products" component={ Products } />
      <Route path="/admin/orders" component={ Orders } />
      <Route path="/orders/:id" component={ OrdersDetails } />
      <Route path="/orders" component={ Orders } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/profile" component={ Profile } />
      <Route path="/admin/profile" component={ Profile } />
      <Route path="/checkout" component={ Checkout } />
      <Redirect from="/" to="/login" />
    </Switch>
  );
}

export default App;
