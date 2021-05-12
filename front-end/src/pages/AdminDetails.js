import React from 'react';

import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react';

import TopBarComponent from '../components/ClientBars/TopBarComponent';
import AdminSideBar from '../components/AdminSideBar';
import AdminDetailsComponent from '../components/AdminDetailsComponent';

function AdminDetails() {
  return (
    <Grid textAlign="center" style={ { height: '100vh' } } verticalAlign="middle">
      <Grid.Column style={ { maxWidth: 500 } }>
        <TopBarComponent>Detalhes de Pedido</TopBarComponent>
        <AdminSideBar Component={ AdminDetailsComponent } />
      </Grid.Column>
    </Grid>
  );
}

export default AdminDetails;
