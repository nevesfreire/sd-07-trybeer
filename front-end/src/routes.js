import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProfileAdmin from './pages/ProfileAdmin';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Client from './pages/Cliente';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/home" component={ Admin } />
      <Route exact path="/products" component={ Client } />
      <Route exact path="/admin/profile" component={ ProfileAdmin } />
      <Route exact path="/admin/orders" component={ Admin } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/checkout" component={ Checkout } />
<<<<<<< HEAD
      <Route exact path="/admin/profile" component={ ProfileAdmin } />
      <Route exact path="/orders" component={ Orders } />
=======
>>>>>>> 640824d159e71f2284c5368c8d26af1413140351
    </Switch>
  </BrowserRouter>
);

export default Routes;
