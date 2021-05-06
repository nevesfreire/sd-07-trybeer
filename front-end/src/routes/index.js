import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import Login from '../pages/Login';
import RegisterPage from '../pages/RegisterPage';
import ProductsPage from '../pages/ProductsPage';
import ClientProfile from '../pages/ClientProfile';

const Routes = () => {
  let componentToRender = '/login';
  const userLocalStorage = localStorage.getItem('user');
  if (userLocalStorage) {
    // const user = JSON.parse(userLocalStorage);
    componentToRender = '/products';
  }
  return (
    <BrowserRouter>
      <Redirect exact from="/" to={ componentToRender } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ RegisterPage } />
      <Route exact path="/products" component={ ProductsPage } />
      <Route exact path="/profile" component={ ClientProfile } />
    </BrowserRouter>
  );
};

export default Routes;
