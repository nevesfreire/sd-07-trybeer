import React, { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import CustomOrder from './CustomOrder';
import { fetchOrderById } from '../service/order';
import { getOrderById } from '../helpers/localStorage';

import './componentStyle.css';

const CustomRenderOrderById = () => {
  const [order] = useState(getOrderById());
  useEffect(() => {
    fetchOrderById();
  }, []);

  return (
    <Card.Group centered>
      { !order ? (
        null
      ) : (
        order.map((beer, index) => (
          <div key={ index }>
            <CustomOrder index={ index } beer={ beer } key={ index } />
          </div>
        )))}
    </Card.Group>
  );
};

export default CustomRenderOrderById;
