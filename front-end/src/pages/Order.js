import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import CustomHeader from '../components/CustomHeader';
import CustomOrder from '../components/CustomOrder';
import { fetchOrderById } from '../service/order';
import { getOrderById } from '../helpers/localStorage';

function Order() {
  const [order] = useState(getOrderById());

  useEffect(() => {
    fetchOrderById();
  }, []);

  useEffect(() => {
    const renderOrderById = (() => (
      <div>
        { !order ? (
          null
        ) : (
          order.map((beer, index) => (
            <Grid.Column key={ beer.id }>
              <CustomOrder
                index={ index }
                beer={ beer }
              />
            </Grid.Column>
          )))}
      </div>
    ));
    return (
      <div>

        <CustomHeader message="Meus Pedidos" />
        {renderOrderById()}
      </div>
    );
  }, [order]);
  renderOrderById();
}

export default Order;
