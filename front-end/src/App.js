import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import Register from './pages/Register';
import Products from './pages/Client/Products';
import Profile from './pages/Client/Profile';
import Orders from './pages/Client/Orders';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/products" component={ Products } />
      <Route exact path="/admin/orders" component={ Orders } />
      <Route exact path="/orders" component={ Orders } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route exact path="/profile" component={ Profile } />
      <Redirect from="/" to="/login" />
    </Switch>
  );
}

export default App;
