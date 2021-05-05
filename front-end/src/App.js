import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import Products from './pages/Client/Products';
import Profile from './pages/Client/Profile';
import Orders from './pages/Client/Orders';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/products" component={ Products } />
      <Route path="/admin" />
      <Route path="/login" component={ Login } />
      <Route path="/register" />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/orders" component={ Orders } />
      <Redirect from="/" to="/login" />
    </Switch>
  );
}

export default App;
