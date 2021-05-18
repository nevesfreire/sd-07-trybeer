import React from 'react';
import { Container, Header } from 'semantic-ui-react';

import CustomHeader from '../components/CustomHeader';
import CustomRenderOrderById from '../components/CustomRenderOrderById';
import CustomTopMenu from '../components/CustomTopMenu';

function Order() {
  return (
    <div
      style={ { width: '100%', backgroundColor: 'rgb(33, 33, 33)' } }
    >
      <Header style={ { display: 'flex', alignItems: 'center' } }>
        <CustomTopMenu />
        <CustomHeader message="Meus Pedidos" />
      </Header>
      <Container>
        <CustomRenderOrderById />
      </Container>
    </div>
  );
}

export default Order;
