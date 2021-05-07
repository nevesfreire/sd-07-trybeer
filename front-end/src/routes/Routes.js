import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TopMenu from '../component/TopMenu';
import { Login, Register } from '../pages';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/test" component={ TopMenu } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
