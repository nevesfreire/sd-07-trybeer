import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';
import Products from './pages/Products';

import ClientProfile from './pages/Client/Profile';
import Orders from './pages/Client/Orders';
import OrdersDetail from './pages/Client/OrdersDetail';
import Checkout from './pages/Client/Checkout';
import AdminProfile from './pages/Admin/Profile';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminDetailOrder from './pages/Admin/OrdersDetail';

const App = () => (
  <BrowserRouter>
    <Route exact path="/" component={ Login } />
    <Route exact path="/login" component={ Login } />
    <Route exact path="/register" component={ Register } />
    <Route exact path="/admin/orders" component={ AdminOrders } />
    <Route exact path="/admin/profile" component={ AdminProfile } />
    <Route exact path="/products" component={ Products } />
    <Route exact path="/orders" component={ Orders } />
    <Route exact path="/orders/:numeroDoPedido" component={ OrdersDetail } />
    <Route exact path="/profile" component={ ClientProfile } />
    <Route exact path="/checkout" component={ Checkout } />
    <Route exact path="/admin/orders/:id" component={ AdminDetailOrder } />
  </BrowserRouter>
);

export default App;
