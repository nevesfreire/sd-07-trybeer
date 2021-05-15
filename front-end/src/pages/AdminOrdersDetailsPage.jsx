import React, { useEffect, useState } from 'react';
import HeaderBurguer from '../components/HeaderBurger';
import AdminOrdersDetailsComponent from '../components/AdminOrdersDetailsComponent';

function AdminOrdersDetails(props) {
  
  return (
    <>
      <HeaderBurguer titulo="TryBeer" isAdmin={true} />
      <AdminOrdersDetailsComponent { ...props } />
    </>
  );
}

export default AdminOrdersDetails;
