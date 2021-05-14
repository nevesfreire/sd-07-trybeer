import React from 'react';
import HeaderBurguer from '../components/HeaderBurger';
import AdminOrdersDetailsComponent from '../components/AdminOrdersDetailsComponent';

function AdminOrdersDetails({ history }) {
  return (
    <>
      <HeaderBurguer titulo="TryBeer" isAdmin />
      <AdminOrdersDetailsComponent history={ history } />
    </>
  );
}

export default AdminOrdersDetails;
