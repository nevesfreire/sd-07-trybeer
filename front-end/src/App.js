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
          <Route path="/register" component={ Register } />
          <Route path="/profile" component={ Profile } />
          <Route path="/products" component={ Products } />
          <Route path="/checkout" component={ Checkout } />
          <Route path="/orders/:id" component={ OrderDetail } />
          <Route path="/orders" component={ Orders } />
          <Route path="/admin/profile" component={ AdmProfile } />
          <Route path="/admin/orders/:id" component={ AdmOrderDetail } />
          <Route path="/admin/orders" component={ AdmOrders } />
          <Redirect from="/" to="/login" />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
