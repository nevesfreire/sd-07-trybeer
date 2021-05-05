import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Products from './pages/Client/Products';
import Profile from './pages/Client/Profile';
import Orders from './pages/Client/Orders';
import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/register" />
      <Route exact path="/products" component={ Products } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/orders" component={ Orders } />
    </Switch>
  );
}

export default App;
