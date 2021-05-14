import React, { useEffect, useState } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import CustomHeader from '../components/CustomHeader';
import CustomDetails from '../components/CustomDetails';
import { getOrderDetails } from '../helpers/localStorage';

function Details() {
  const [detail] = useState(getOrderDetails());
  console.log(detail);
  let sumTotal = 0;
  detail.map((total) => {
    (
      sumTotal = total.total + sumTotal);
  });
  useEffect(() => {
  }, []);

  useEffect(() => {
    const detailHeader = (() => (
      <Segment>
        <div>
          {!detail ? (null) : (
            <div>
              <p data-testid="order-number">{`Pedido ${detail[0].sale_id}`}</p>
              <p data-testid="order-date">{ detail[0].sale_date}</p>
              <p data-testid="order-total-value">
                {`R$ ${sumTotal
                  .toFixed(2).replace('.', ',')}`}
              </p>
            </div>
          )}
        </div>
      </Segment>
    ));

    const renderOrderDetail = (() => (
      <div>
        { !detail ? (
          null
        ) : (
          detail.map((beer, index) => (
            <Grid.Column key={ beer.id }>
              <CustomDetails
                index={ index }
                beer={ beer }
              />
            </Grid.Column>
          )))}
      </div>
    ));

    return (
      <div>
        <CustomHeader message="Detalhes de Pedido" />
        {detailHeader()}
        {renderOrderDetail()}
      </div>
    );
  }, [detail, sumTotal]);
  detailHeader();
  renderOrderDetail();
}

export default Details;
