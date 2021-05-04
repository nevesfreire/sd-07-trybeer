import React from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={ () => <h1>login</h1> } />
        <Route exact path="/" component={ () => <Redirect to="/login" /> } />
      </Switch>
    </BrowserRouter>
  );
}
