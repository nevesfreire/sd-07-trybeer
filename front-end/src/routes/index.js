import React from 'react';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import RegisterPage from '../pages/RegisterPage';

const Routes = () => (
    <BrowserRouter>
        <Redirect from="/" to="/login" />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={RegisterPage} />
    </BrowserRouter>
);

export default Routes;