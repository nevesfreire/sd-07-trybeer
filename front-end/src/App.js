import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import AdminOrders from './pages/AdminOrders';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AdminProfile from './pages/AdminProfile';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/products" component={ Products } />
      <Route path="/admin/order" component={ AdminOrders } />
      <Route path="/profile" component={ Profile } />
      <Route path="/admin/profile" component={ AdminProfile } />
    </Switch>
  );
}

export default App;
