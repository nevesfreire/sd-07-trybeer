import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import AdminProfile from './pages/AdminProfile';
import Order from './pages/Order';

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
    <PrivateRouter exact path="/checkout" component={ Checkout }/>
    <PrivateRouter exact path="/orders" component={ Order }/>
    <PrivateRouter exact path="/orders/:" />
    <Route exact path="/admin/orders" component={ Admin }/>
    <Route exact path="/admin/profile" component={ AdminProfile }/>
  </Switch>
);

export default Routes;
