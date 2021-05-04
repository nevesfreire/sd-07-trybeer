import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Registro } />
    </Switch>
  );
}

export default App;
