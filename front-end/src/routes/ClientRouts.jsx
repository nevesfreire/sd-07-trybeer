import React from 'react';
import { Route } from 'react-router-dom';
import { ClientProvider } from '../services/context/client';
// import Views from '../views';
import { SideBar } from '../components';

export default function ClientRouts() {
  return (
    <ClientProvider>
      <Route exact path="/profile" component={ SideBar } />
      <Route exact path="/products" />
      <Route exact path="/orders" />
    </ClientProvider>
  );
}
