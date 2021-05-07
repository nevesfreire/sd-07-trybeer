import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ClientRoutes from './ClientRoutes';

import Views from '../views';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={ Views.Login } />
        <Route exact path="/register" component={ Views.Register } />
        {/* <Route exact path="/profile" component={ Views.Profile } />
        <Route exact path="/products" component={ Views.Products } />
        <Route exact path="/checkout" component={ Views.Checkout } />
        <Route exact path="/orders" component={Views.Orders} /> */}
        <Route exact path="/admin/profile" component={ Views.AdminProfile } />
        <Route exact path="/admin/orders" component={ Views.AdminOrders } />
        <Route exact path="/orders/:id" component={ Views.OrdersID } />
        <Route exact path="/admin/orders/:id" component={ Views.AdminOrdersID } />
        <Route exact path="/" component={ () => <Redirect to="/login" /> } />
        <ClientRoutes />
        <Route path="/" component={ () => <h1>desculpe amigo, não tem nada aqui</h1> } />
      </Switch>
    </BrowserRouter>
  );
}
