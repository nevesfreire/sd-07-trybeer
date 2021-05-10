import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Register from './pages/Register';
import Products from './pages/Client/Products';
import Checkout from './pages/Client/Checkout';
import Profile from './pages/Client/Profile';
import Orders from './pages/Client/Orders';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/products" component={ Products } />
      <Route exact path="/admin/orders" component={ Orders } />
      <Route exact path="/orders" component={ Orders } />
      <Route exact path="/checkout" component={ Checkout } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/profile" component={ Profile } />
      <Redirect from="/" to="/login" />
    </Switch>
  );
}

export default App;
