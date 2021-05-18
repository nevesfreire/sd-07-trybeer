import React, { useState } from 'react';
import { Card, Grid } from 'semantic-ui-react';
import CustomAdminOrders from './CustomAdminOrders';
import { fetchAllOrders } from '../service/order';
import { getAllOrders } from '../helpers/localStorage';

const CustomRenderAllOrders = () => {
  fetchAllOrders();
  const [allOrders] = useState(getAllOrders);
  return (
    <div>
      <Card.Group stackable="true">
        {!allOrders || allOrders === undefined ? null : allOrders.map((beer, index) => (
          <Grid style={ { marginTop: 30 } } key={ index }>
            <CustomAdminOrders key={ beer.id } index={ index } beer={ beer } />
          </Grid>
        ))}
      </Card.Group>
    </div>
  );
};

export default CustomRenderAllOrders;
