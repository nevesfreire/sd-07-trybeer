import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Products from '../../pages/Products';
import AdminHome from '../../pages/AdminHome';

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/products" component={ Products } />
      <Route path="/admin/orders" component={ AdminHome } />
    </Switch>
  );
}

export default AppRoutes;
