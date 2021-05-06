import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../../pages/Login';
import Register from '../../pages/Register';

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
    </Switch>
  );
}

export default AppRoutes;
