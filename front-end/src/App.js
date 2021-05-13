import React from 'react';
import './App.css';

import { Route, Switch, Redirect } from 'react-router-dom';

import Provider from './Context/Provider';
import Login from './Pages/client/Login';
import Register from './Pages/client/Register';
import Profile from './Pages/client/Profile';
import Products from './Pages/client/Products';
import Checkout from './Pages/client/Checkout';
import Orders from './Pages/client/Orders';
import OrderDetail from './Pages/client/OrderDetail';
import AdmProfile from './Pages/adm/AdmProfile';
import AdmOrders from './Pages/adm/AdmOrders';
import AdmOrderDetail from './Pages/adm/AdmOrderDetail';

function App() {
  return (
    <div className="App">
      <Provider>
        <Switch>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/products" component={ Products } />
          <Route exact path="/checkout" component={ Checkout } />
          <Route exact path="/orders" component={ Orders } />
          <Route exact path="/orders/:numero-do-pedido" component={ OrderDetail } />
          <Route exact path="/admin/profile" component={ AdmProfile } />
          <Route exact path="/admin/orders" component={ AdmOrders } />
          <Route exact path="/admin/orders/:id" component={ AdmOrderDetail } />
          <Redirect from="/" to="/login" />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
