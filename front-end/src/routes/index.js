import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import RegisterPage from '../pages/RegisterPage';
import ProductsPage from '../pages/ProductsPage';
import ClientProfile from '../pages/ClientProfile';
import CheckoutPage from '../pages/CheckoutPage';
import HomePage from '../pages/HomePage';

const Routes = () => (
  <BrowserRouter>
    <Route exact path="/login" component={ Login } />
    <Route exact path="/register" component={ RegisterPage } />
    <Route exact path="/products" component={ ProductsPage } />
    <Route exact path="/profile" component={ ClientProfile } />
    <Route exact path="/checkout" component={ CheckoutPage } />
    <Route exact path="/" component={ HomePage } />
  </BrowserRouter>
);
export default Routes;
