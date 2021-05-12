import React from 'react';
import SideBarAdmin from '../components/sideBarAdmin';
import Menu from './style/AdminOrders';

export default function AdminOrders() {
  return (
    <div>
      <h1>Admin-pedidos</h1>
      <Menu>
        <SideBarAdmin />
      </Menu>
    </div>
  );
}
