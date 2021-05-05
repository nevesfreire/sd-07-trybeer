import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/user/Products';
import AdminOrders from './pages/admin/AdminOrders';
import Home from './pages/Home';
import MeusPedidos from './pages/user/MeusPedidos';
import MeuPerfil from './pages/user/MeuPerfil';
import DetalhesPedido from './pages/user/DetalhesPedido';
import FinalizarPedido from './pages/user/FinalizarPedido';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/products" component={ Products } />
      <Route exact path="/orders" component={ MeusPedidos } />
      <Route path="/orders/:id" component={ DetalhesPedido } />
      <Route path="/profile" component={ MeuPerfil } />
      <Route path="/checkout" component={ FinalizarPedido } />
      <Route path="/admin/order" component={ AdminOrders } />
    </Switch>
  );
}

export default App;
