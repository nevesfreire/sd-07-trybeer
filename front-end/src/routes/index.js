import React from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { SideBar } from '../components';

import Views from '../views';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={ Views.Login } />
        <Route exact path="/register" component={ Views.Register } />
        <Route exact path="/SideBar" component={ <SideBar title="Trybeer" /> } />
        <Route exact path="/" component={ () => <Redirect to="/login" /> } />
      </Switch>
    </BrowserRouter>
  );
}
