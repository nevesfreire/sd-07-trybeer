import React from 'react';
import HeaderBurguer from '../components/HeaderBurger';
import AdminOrdersDetailsComponent from '../components/AdminOrdersDetailsComponent';
import { PageContainer } from '../styled/AdminContainers.styled';

function AdminOrdersDetails(props) {
  return (
    <PageContainer>
      <HeaderBurguer titulo="TryBeer" isAdmin />
      <AdminOrdersDetailsComponent { ...props } />
    </PageContainer>
  );
}

export default AdminOrdersDetails;
