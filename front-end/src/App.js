import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import pages from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={ pages.Login } />
        <Route exact path="/register" component={ pages.Register } />
        <Route exact path="/profile" component={ pages.Profile } />
        <Route exact path="/products" component={ pages.Products } />
        <Route exact path="/checkout" component={ pages.Checkout } />
        <Route exact path="/orders" component={ pages.Orders } />
        <Route exact path="/admin/profile" component={ pages.AdminProfile } />
        <Route exact path="/admin/orders" component={ pages.AdminOrders } />
        <Route exact path="/orders/:id" component={ pages.OrdersID } />
        <Route exact path="/admin/orders/:id" component={ pages.AdminOrdersID } />
        <Route exact path="/" component={ () => <Redirect to="/login" /> } />
        <Route path="/" component={ pages.NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
