import React from 'react';
import { Route } from 'react-router-dom';
import { ClientProvider } from '../services/context/client';
import Views from '../views';

export default function ClientRouts() {
  return (
    <ClientProvider>
      <Route exact path="/profile" component={ Views.Profile } />
      <Route exact path="/products" />
      <Route exact path="/orders" />
    </ClientProvider>
  );
}
