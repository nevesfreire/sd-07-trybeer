import React, { useEffect, useState } from 'react';
import CustomHeader from '../components/CustomHeader';
import CustomOrder from '../components/CustomOrder';
import { fetchOrderById } from '../service/order';
import { getOrderById } from '../helpers/localStorage';
import { Grid } from 'semantic-ui-react';

function Order() {

const [order, _setOrder] = useState(getOrderById())

    
useEffect(() => {
   fetchOrderById();
}, [])

useEffect(() => {
    renderOrderById();
 }, [])

const renderOrderById = () => {

    return(
<div>
{ !order? (
    null
  ) : (
    order.map((beer, index) => (
      <Grid.Column>
        <CustomOrder
          key={beer.id}
          index={index}
          beer={beer}
        />
      </Grid.Column>
  )))}
    </div>
    )
    }
  return (
    <div>

      <CustomHeader message={ 'Meus Pedidos' } />
      {renderOrderById()}
    </div>
  );
}

export default Order;
