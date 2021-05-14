import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import CustomHeader from '../components/CustomHeader';
import CustomDetails from '../components/CustomDetails';
import { getOrderDetails } from '../helpers/localStorage';

function Details() {
  const [detail, setDetail] = useState(getOrderDetails());
  console.log(detail, setDetail);
  let sumTotal = 0;
  detail.map((total) => (sumTotal = total.total + sumTotal));
  useEffect(() => {}, []);

  const detailHeader = useCallback(() => (
    <Segment>
      <div>
        {!detail ? null : (
          <div>
            <p data-testid="order-number">{`Pedido ${detail[0].sale_id}`}</p>
            <p data-testid="order-date">{detail[0].sale_date}</p>
            <p data-testid="order-total-value">
              {`R$ ${sumTotal
                .toFixed(2)
                .replace('.', ',')}`}
            </p>
          </div>
        )}
      </div>
    </Segment>
  ), [detail, sumTotal]);

  const renderOrderDetail = useCallback(() => (
    <div>
      {!detail
        ? null
        : detail.map((beer, index) => (
          <Grid.Column>
            <CustomDetails key={ beer.id } index={ index } beer={ beer } />
          </Grid.Column>
        ))}
    </div>
  ));
  
  useEffect(() => {
    detailHeader();
    renderOrderDetail();
  }, [detailHeader, renderOrderDetail]);

  return (
    <div>
      <CustomHeader message="Detalhes de Pedido" />
      {detailHeader()}
      {renderOrderDetail()}
    </div>
  );
}

export default Details;
