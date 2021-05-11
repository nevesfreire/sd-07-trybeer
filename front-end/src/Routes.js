import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Products from './pages/Products';
import Checkout from './pages/Checkout';

const isAuthenticated = () => localStorage.getItem('token');

export const PrivateRouter = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => 
                    isAuthenticated() ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{pathname:"/login", state: {from:props.location}}} />
                    )
                }
        />
    )
}


const Routes = () => (
  <Switch>
    <Route exact path="/register" component={ SignUpForm } />
    <Route exact path="/profile" component={ Profile } />
    <Route exact path="/login" component={ Login } />
    <Route exact path="/" component={ Login } />
    <PrivateRouter exact path="/products" component={ Products } />
    <Route exact path="/admin/orders" />
    <PrivateRouter exact path="/checkout" component={ Checkout }/>
  </Switch>
);

export default Routes;
