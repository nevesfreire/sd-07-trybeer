import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Switch } from 'react-router';
import './App.css';
import Login from './pages/Login';
import GlobalStyle from './globalStyles';
import { ApiProvider } from './context/apiContext';
import Register from './pages/Register';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <ApiProvider>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login" component={ Login } />
            <Route path="/register" component={ Register } />
          </ApiProvider>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
