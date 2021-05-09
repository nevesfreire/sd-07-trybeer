import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import TrybeerProvider from './context/TrybeerProvider';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import PendingOrders from './pages/PendingOrdersPage';
import Products from './pages/ProductsPage';
import ClientProfile from './pages/ClientProfilePage';

function App() {
  return (
    <BrowserRouter>
      <TrybeerProvider>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/admin/orders" component={ PendingOrders } />
          <Route exact path="/products" component={ Products } />
          <Route exact path="/profile" component={ ClientProfile } />
        </Switch>
      </TrybeerProvider>
    </BrowserRouter>
  );
}

export default App;
