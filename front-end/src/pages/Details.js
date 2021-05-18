import React, { useEffect, useState, useCallback } from 'react';
import { Container, Grid, Header, Segment } from 'semantic-ui-react';
import CustomHeader from '../components/CustomHeader';
import CustomDetails from '../components/CustomDetails';
import { getOrderDetails } from '../helpers/localStorage';
import CustomTopMenu from '../components/CustomTopMenu';

function Details() {
  const [detail] = useState(getOrderDetails());
  let sumTotal = 0;
  detail.map((total) => {
    (sumTotal = total.total + sumTotal);
    return sumTotal;
  });

  const detailHeader = useCallback(() => (
    <Segment>
      <div>
        {!detail ? null : (
          <div>
            <h3 data-testid="order-number">{`Pedido ${detail[0].sale_id}`}</h3>
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
    <Container>
      <h3 style={ { color: 'white' } }>
        Itens do pedido:
      </h3>
      {!detail
        ? null
        : detail.map((beer, index) => (
          <Grid.Column key={ beer.id }>
            <CustomDetails
              index={ index }
              beer={ beer }
            />
          </Grid.Column>
        ))}
    </Container>
  ), [detail]);

  useEffect(() => {
    detailHeader();
    renderOrderDetail();
  }, [detailHeader, renderOrderDetail]);

  return (
    <div style={ { width: '100%', backgroundColor: 'rgb(33, 33, 33)' } }>
      <Header style={ { display: 'flex', alignItems: 'center' } }>
        <CustomTopMenu />
        <CustomHeader message="Detalhes de Pedido" />
      </Header>
      <Container>
        {detailHeader()}
        {renderOrderDetail()}
      </Container>
    </div>
  );
}

export default Details;
