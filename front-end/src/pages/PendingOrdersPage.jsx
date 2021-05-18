import React from 'react';
import HeaderBurguer from '../components/HeaderBurger';
import PendingOrdersComponent from '../components/PendingOrdersComponent';
import { PageContainer } from '../styled/AdminContainers.styled';

function PendingOrders() {
  return (
    <PageContainer>
      <HeaderBurguer titulo="TryBeer" isAdmin />
      <PendingOrdersComponent />
    </PageContainer>
  );
}

export default PendingOrders;
