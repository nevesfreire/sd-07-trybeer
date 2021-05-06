import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import {
  RegisterPage,
  LoginPage,
  AdminHome,
  Products,
  Profile,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route path="/login" component={ LoginPage } />
        <Route path="/register" component={ RegisterPage } />
        <ProtectedRoute path="/admin/orders" component={ AdminHome } />
        <ProtectedRoute path="/products" component={ Products } />
        <ProtectedRoute path="/profile" component={ Profile } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
