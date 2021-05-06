import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import ClientRouts from './ClientRouts';

import Views from '../views';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={ Views.Login } />
        <Route exact path="/register" component={ Views.Register } />
        <ClientRouts />
        <Route exact path="/checkout" />
        <Route exact path="/admin/profile" />
        <Route exact path="/admin/orders" />
        <Route exact path="/orders/:id" />
        <Route exact path="/admin/orders/:id" />
        <Route exact path="/" component={ () => <Redirect to="/login" /> } />
        <Route path="/" component={ () => <h1>desculpe amigo, não tem nada aqui</h1> } />
      </Switch>
    </BrowserRouter>
  );
}
