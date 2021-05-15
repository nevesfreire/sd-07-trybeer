import React from 'react';
import { Container, Header } from 'semantic-ui-react';

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
      <Container style={{ padding: 20 }}>
        <Header as="h1" color="orange" textAlign="center">Pedidos</Header>
        <CustomRenderAllOrders />
      </Container>
    </div>

  );
}

export default AdminOrders;
