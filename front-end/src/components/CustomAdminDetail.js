import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid } from 'semantic-ui-react';

export default function CustomAdminDetail({ index, beer }) {
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
            <Card.Meta data-testid={ `${index}-order-unit-price` }>
              {`(R$ ${(beer.total / beer.quantity)
                .toFixed(2).toString().replace('.', ',')})`}
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

CustomAdminDetail.propTypes = {
  index: PropTypes.number.isRequired,
  beer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};
