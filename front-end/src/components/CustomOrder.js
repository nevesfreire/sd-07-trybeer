import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Grid } from 'semantic-ui-react';


export default function CustomOrder({ index, beer }) {
  return (
    <Link to={`/orders/${beer.id}`}>
    <Grid>
      {!beer ? (
       null
      ) : (
        
        <Card data-testid={`${index}-order-card-container`}>
          <Card.Content>
            <Card.Header data-testid={`${index}-order-number`}>
              {`Pedido ${beer.id}`}
            </Card.Header>

            <Card.Meta data-testid={`${index}-order-date`}>
              {`Data 
                  ${beer.sale_date.split('T')[0].split('-')[2]}/${beer.sale_date.split('T')[0].split('-')[1]}`}
            </Card.Meta>

            <Card.Description data-testid={`${index}-order-total-value`}>
             {`R$ ${(beer.total_price).replace('.', ',')}`}
            </Card.Description>
          </Card.Content>
        </Card>
      )}
    </Grid>
    </Link>  
  );
}
