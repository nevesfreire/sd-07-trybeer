import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import AdminOrders from './pages/AdminOrders';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/products" component={ Products } />
      <Route path="/admin/orders" component={ AdminOrders } />
    </Switch>
  );
}

export default App;
