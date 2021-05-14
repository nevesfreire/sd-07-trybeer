import React from 'react';
import { Card, Grid } from 'semantic-ui-react';

export default function CustomDetails({ index, beer }) {
  return (

    <Grid>
      {!beer ? (
        null
      ) : (

        <Card data-testid={ `${index}-order-card-container` }>
          <Card.Content>
            <Card.Header data-testid={ `${index}-product-name` }>
              {`${beer.name}`}
            </Card.Header>

            <Card.Meta data-testid={ `${index}-product-qtd` }>
              {`Quantidade 
                  ${beer.quantity}`}
            </Card.Meta>

            <Card.Description data-testid={ `${index}-product-total-value` }>
              {`R$ ${beer.total.toFixed(2).toString().replace('.', ',')}`}
            </Card.Description>
          </Card.Content>
        </Card>
      )}
    </Grid>

  );
}
