import React from 'react';
import CustomSideBarAdmin from '../components/CustomSideBarAdmin';
import CustomRenderAllOrders from '../components/CustomRenderAllOrders';
import { fetchAllOrders } from '../service/order';

function AdminOrders() {
  fetchAllOrders();
  return (
    <div className="container-order-details">
      <sidebar>
        <CustomSideBarAdmin />
      </sidebar>
      <main>
        <header>Pedidos</header>
        <CustomRenderAllOrders />
      </main>
    </div>

  );
}

export default AdminOrders;
