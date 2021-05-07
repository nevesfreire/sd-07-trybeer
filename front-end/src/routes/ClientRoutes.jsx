import React from 'react';
import { Route } from 'react-router-dom';
import { ClientProvider } from '../services/context/client';
import Views from '../views';

export default function ClientRoutes() {
  return (
    <ClientProvider>
      <Route exact path="/profile" component={ Views.Profile } />
      <Route exact path="/products" component={ Views.Products } />
      <Route exact path="/checkout" component={ Views.Checkout } />
      <Route exact path="/orders" component={ Views.Orders } />
    </ClientProvider>
  );
}
