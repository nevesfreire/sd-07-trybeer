import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from 'styled-components';
import TrybeerProvider from './context/TrybeerProvider';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import PendingOrders from './pages/PendingOrdersPage';
import Products from './pages/ProductsPage';
import Orders from './pages/OrdersPage';
import Checkout from './pages/CheckoutPage';
import ClientProfile from './pages/ClientProfilePage';
import OrdersDetails from './pages/OrdersDetailsPage';
import AdminProfile from './pages/AdminProfilePage';
import GlobalStyle from './global';
import AdminOrdersDetails from './pages/AdminOrdersDetailsPage';

const theme = {
  primaryDark: '#0D0C1D',
  primaryLight: '#EFFFFA',
  primaryHover: '#343078',
  mobile: '576px',
};

function App() {
  return (
    <BrowserRouter>
      <TrybeerProvider>
        <ThemeProvider theme={ theme }>
          <GlobalStyle />
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/register" component={ Register } />
            <Route exact path="/admin/orders" component={ PendingOrders } />
            <Route exact path="/products" component={ Products } />
            <Route exact path="/orders" component={ Orders } />
            <Route exact path="/orders/:numero-do-pedido" component={ OrdersDetails } />
            <Route exact path="/profile" component={ ClientProfile } />
            <Route exact path="/checkout" component={ Checkout } />
            <Route exact path="/admin/profile" component={ AdminProfile } />
            <Route exact path="/admin/orders/:id" component={ AdminOrdersDetails } />
          </Switch>
        </ThemeProvider>
      </TrybeerProvider>
    </BrowserRouter>
  );
}

export default App;
