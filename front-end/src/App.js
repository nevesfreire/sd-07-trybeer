import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router'
import './App.css';
import Login from './pages/Login';
import GlobalStyle from './globalStyles';
import {ApiProvider} from './context/apiContext';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <ApiProvider>
            <Route path="/" component={ Login }/>
          </ApiProvider>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
