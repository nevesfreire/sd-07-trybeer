import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import CustomAdminOrders from './CustomAdminOrders';
import { fetchAllOrders } from '../service/order';
import { getAllOrders } from '../helpers/localStorage';

const CustomRenderAllOrders = () => {
  fetchAllOrders();
  const [allOrders, setAllOrders] = useState(getAllOrders);
  console.log(setAllOrders);
  return (
    <div>
      {!allOrders || allOrders === undefined ? null : allOrders.map((beer, index) => (
        <Grid.Column key={ index }>
          <CustomAdminOrders key={ beer.id } index={ index } beer={ beer } />
        </Grid.Column>
      ))}
    </div>
  );
};

export default CustomRenderAllOrders;
