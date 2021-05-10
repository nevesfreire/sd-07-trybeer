import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from './context';

import ProtectedRoute from './ProtectedRoute';
import {
  LoginPage,
  ProductsPage,
  RegisterPage,
  CheckoutPage,
  AdminHome,
  Profile,
  ProfileAdmin,
  AllOrdersPage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <ProtectedRoute>
            <Route path="/products" component={ProductsPage} />
            <Route path="/products" component={ProductsPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/admin/orders" component={AdminHome} />
            <Route path="/admin/profile" component={ProfileAdmin} />
            <Route path="/profile" component={Profile} />
            <Route path="/orders" component={AllOrdersPage} />
          </ProtectedRoute>

        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
