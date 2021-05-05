import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// import Profile from './pages/Profile';
// import Products from './pages/Products';
// import Checkout from './pages/Checkout';
// import Orders from './pages/Orders';
// import Admin from './components/AdminComponent';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Home } />
    <Route path="/login" component={ Login } />
    <Route path="/register" component={ Register } />
    { /* <Route path="/profile" component={ Profile } /> */ }
    { /* <Route path="/products" component={ Products } /> */ }
    { /* <Route path="/checkout" component={ Checkout } /> */ }
    { /* <Route path="/order/:id" component={ Orders } /> */ }
    { /* <Route path="/order" component={ Orders } /> */ }
    { /* <Route path="/admin/orders/:id" component={ Admin } /> */ }
    { /* <Route path="/admin/profile" component={ Admin } /> */ }
    { /* <Route path="/admin/orders" component={ Admin } /> */ }
  </Switch>
);

export default Routes;
