import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from './context';

import { LoginPage, ProductsPage, RegisterPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Provider>
          <Route exact path="/" component={ LoginPage } />
          <Route path="/login" component={ LoginPage } />
          <Route path="/register" component={ RegisterPage } />
          <Route path="/products" component={ ProductsPage } />
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
