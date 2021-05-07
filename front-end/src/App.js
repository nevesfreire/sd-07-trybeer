import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Provider } from './context';

import {
  RegisterPage,
  LoginPage,
  AdminHome,
  Profile,
  ProductsPage,
  ProfileAdmin,
  AllOrdersPage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route exact path="/" component={ LoginPage } />
          <Route path="/login" component={ LoginPage } />
          <Route path="/register" component={ RegisterPage } />
          <ProtectedRoute path="/admin/orders" component={ AdminHome } />
          <ProtectedRoute path="/products" component={ ProductsPage } />
          <ProtectedRoute path="/profile" component={ Profile } />
          <ProtectedRoute path="/admin/profile" component={ ProfileAdmin } />
          <ProtectedRoute path="/orders" component={ AllOrdersPage } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
