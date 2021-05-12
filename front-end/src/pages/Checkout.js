import React from 'react';

import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react';

import TopBarComponent from '../components/ClientBars/TopBarComponent';
import SideBarComponent from '../components/ClientBars/SideBarComponent';
import CheckoutListComponent from '../components/Checkout/CheckoutListComponent';

function Checkout() {
  return (
    <Grid textAlign="center" style={ { height: '100vh' } } verticalAlign="middle">
      <Grid.Column style={ { maxWidth: 500 } }>
        <TopBarComponent>Finalizar Pedido</TopBarComponent>
        <SideBarComponent Component={ CheckoutListComponent } />
      </Grid.Column>
    </Grid>
  );
}

export default Checkout;
