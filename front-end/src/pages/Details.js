import React, { useEffect, useState } from 'react';
import CustomHeader from '../components/CustomHeader';
import CustomDetails from '../components/CustomDetails';
import { fetchOrderDetails } from '../service/order';
import { getOrderDetails } from '../helpers/localStorage';
import { Grid, Segment } from 'semantic-ui-react';

function Details() {

const [detail, _setDetail] = useState(getOrderDetails())
console.log(detail)
let sumTotal = 0
detail.map((total) =>  (
  sumTotal =total.total + sumTotal))
useEffect(() => {
}, [])

useEffect(() => {
    detailHeader();
    renderOrderDetail();
 }, [])

const detailHeader = () => {
    return(
      <Segment>
        <div>
            {!detail ? (null): (
                <div>
                    <p data-testid="order-number">{`Pedido ${detail[0].sale_id}`}</p>
                    <p data-testid="order-date">{ detail[0].sale_date}</p>
                    <p data-testid="order-total-value">{`R$ ${sumTotal.toFixed(2).replace('.', ',')}`}</p>
                </div>
            )}
        </div>
        </Segment>
    )
}


const renderOrderDetail = () => {
    return(
<div>
{ !detail? (
    null
  ) : (
    detail.map((beer, index) => (
      <Grid.Column>
        <CustomDetails
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
      <CustomHeader message={ 'Detalhes de Pedido' } />
      {detailHeader()}
      {renderOrderDetail()}
    </div>
  );
}

export default Details;
