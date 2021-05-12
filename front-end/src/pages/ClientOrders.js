import React from 'react';

import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react';

import TopBarComponent from '../components/ClientBars/TopBarComponent';
import SideBarComponent from '../components/ClientBars/SideBarComponent';
import ClientOrdersComponent from '../components/ClientOrders/ClientOrdersComponent';

function ClientOrders() {
  return (
    <Grid textAlign="center" style={ { height: '100vh' } } verticalAlign="middle">
      <Grid.Column style={ { maxWidth: 500 } }>
        <TopBarComponent>Meus Pedidos</TopBarComponent>
        <SideBarComponent Component={ ClientOrdersComponent } />
      </Grid.Column>
    </Grid>
  );
}

export default ClientOrders;
