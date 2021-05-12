import React from 'react';

import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react';

import TopBarComponent from '../components/ClientBars/TopBarComponent';
import AdminSideBar from '../components/AdminSideBar';
import AdminOrdersComponent from '../components/AdminOrdersComponent';

function AdminOrders() {
  return (
    <Grid textAlign="center" style={ { height: '100vh' } } verticalAlign="middle">
      <Grid.Column style={ { maxWidth: 500 } }>
        <TopBarComponent>Admin Orders</TopBarComponent>
        <AdminSideBar Component={ AdminOrdersComponent } />
      </Grid.Column>
    </Grid>
  );
}

export default AdminOrders;
