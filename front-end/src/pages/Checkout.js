import React from 'react';

import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react';

import TopBarComponent from '../components/TopBarComponent';
// import SideBarComponent from '../components/SideBarComponent';

function Checkout() {
  return (
    <Grid textAlign="center" style={ { height: '100vh' } } verticalAlign="middle">
      <Grid.Column style={ { maxWidth: 500 } }>
        <TopBarComponent>TryBeer</TopBarComponent>
        {/* <SideBarComponent Component={} /> */}
      </Grid.Column>
    </Grid>
  );
}

export default Checkout;
