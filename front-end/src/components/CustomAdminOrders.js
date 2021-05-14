import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Grid } from 'semantic-ui-react';
import { fetchOrderDetails } from '../service/order';

export default function CustomOrder({ index, beer }) {
  fetchOrderDetails(beer.id);
  return (
    <Link to={ `/admin/orders/${beer.id}` }>
      <Grid>
        {!beer ? (
          null
        ) : (

          <Card data-testid={ `${index}-order-card-container` }>
            <Card.Content>
              <Card.Header data-testid={ `${index}-order-number` }>
                {`Pedido ${beer.id}`}
              </Card.Header>

              <Card.Meta data-testid={ `${index}-order-address` }>
                {`Rua ${beer.delivery_address}, ${beer.delivery_number}`}
              </Card.Meta>

              <Card.Description id="total" data-testid={ `${index}-order-total-value` }>
                {`R$ ${(beer.total_price).replace('.', ',')}`}
              </Card.Description>
            </Card.Content>
            <label htmlFor="total" data-testid={ `${index}-order-status` }>
              {beer.status}
            </label>
          </Card>
        )}
      </Grid>
    </Link>
  );
}
