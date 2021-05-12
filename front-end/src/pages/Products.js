import React from 'react';

import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react';

import TopBarComponent from '../components/ClientBars/TopBarComponent';
import SideBarComponent from '../components/ClientBars/SideBarComponent';
import ProductsListComponent from '../components/Products/ProductsListComponent';

function Products() {
  return (
    <Grid textAlign="center" style={ { height: '100vh' } } verticalAlign="middle">
      <Grid.Column style={ { maxWidth: 500 } }>
        <TopBarComponent>TryBeer</TopBarComponent>
        <SideBarComponent Component={ ProductsListComponent } />
      </Grid.Column>
    </Grid>
  );
}

export default Products;
