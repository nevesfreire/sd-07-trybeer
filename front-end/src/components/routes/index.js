import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import ClientProfilePage from '../../pages/ClientProfile';
import AdminProfilePage from '../../pages/AdminProfile';
import Products from '../../pages/Products';
import AdminHome from '../../pages/AdminHome';
import ClientOrdersPage from '../../pages/ClientOrders';
import ClientOrderDetailsPage from '../../pages/ClientOrderDetails';

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/profile" component={ ClientProfilePage } />
      <Route exact path="/orders" component={ ClientOrdersPage } />
      <Route path="/orders/:id" component={ ClientOrderDetailsPage } />
      <Route path="/admin/profile" component={ AdminProfilePage } />
      <Route path="/products" component={ Products } />
      <Route path="/admin/orders" component={ AdminHome } />
    </Switch>
  );
}

export default AppRoutes;
