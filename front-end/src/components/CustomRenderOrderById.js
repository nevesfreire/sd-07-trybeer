import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import CustomOrder from './CustomOrder';
import { fetchOrderById } from '../service/order';
import { getOrderById } from '../helpers/localStorage';

const CustomRenderOrderById = () => {
  const [order, setOrder] = useState(getOrderById());
  console.log(setOrder);
  useEffect(() => {
    fetchOrderById();
  }, []);

  return (
    <div>
      { !order ? (
        null
      ) : (
        order.map((beer, index) => (
          <Grid.Column key={ index }>
            <CustomOrder index={ index } beer={ beer } />
          </Grid.Column>
        )))}
    </div>
  );
};

export default CustomRenderOrderById;
