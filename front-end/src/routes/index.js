import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {
  Login,
  Register,
  Orders,
  ProfileClient,
  Products,
  AdminOrders,
  ProfileAdmin,
  detailsAdmin,
} from '../pages';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/orders" component={ Orders } />
      <Route exact path="/profile" component={ ProfileClient } />
      <Route exact path="/products" component={ Products } />
      <Route exact path="/admin/orders" component={ AdminOrders } />
      <Route exact path="/admin/orders/:id" component={ detailsAdmin } />
      <Route exact path="/admin/profile" component={ ProfileAdmin } />
    </Switch>
  </Router>
);

export default Routes;
