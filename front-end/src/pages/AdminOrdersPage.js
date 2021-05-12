import React from 'react';
import MenuTop from '../components/MenuTop';
import Orders from '../components/Orders';

function AdminOrdersPage() {
  return (
    <div className="products-page">
      <MenuTop />
      <div className="admin-container">
      <Orders />
      </div>
    </div>
  );
}

export default AdminOrdersPage;
