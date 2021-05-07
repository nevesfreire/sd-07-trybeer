import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from './context';

import ProtectedRoute from './ProtectedRoute';
import {
  LoginPage,
  ProductsPage,
  RegisterPage,
  CheckoutPage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Provider>
          <Route exact path="/" component={ LoginPage } />
          <Route exact path="/login" component={ LoginPage } />
          <Route path="/register" component={ RegisterPage } />
          <ProtectedRoute>
            <Route path="/products" component={ ProductsPage } />
            <Route path="/checkout" component={ CheckoutPage } />
          </ProtectedRoute>
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
