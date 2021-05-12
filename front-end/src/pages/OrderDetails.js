import React from 'react';

import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react';

import TopBarComponent from '../components/ClientBars/TopBarComponent';
import SideBarComponent from '../components/ClientBars/SideBarComponent';
import OrderDetailsComp from '../components/ClientOrdersDetails/OrderDetailsComponent';

function OrderDetails() {
  return (
    <Grid textAlign="center" style={ { height: '100vh' } } verticalAlign="middle">
      <Grid.Column style={ { maxWidth: 500 } }>
        <TopBarComponent>Detalhes de Pedido</TopBarComponent>
        <SideBarComponent Component={ OrderDetailsComp } />
      </Grid.Column>
    </Grid>
  );
}

export default OrderDetails;
