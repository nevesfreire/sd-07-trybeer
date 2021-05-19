import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Table } from 'semantic-ui-react';

export default function CustomAdminDetail({ index, beer }) {
  return (

    <Grid style={ { marginRight: 50 } }>
      {!beer ? (
        null
      ) : (
        <Table.Row key={ beer.id } data-testid={ `${index}-order-card-container` }>
          <Table.Cell data-testid={ `${index}-product-qtd` }>
            {`${beer.quantity}`}
          </Table.Cell>
          <Table.Cell data-testid={ `${index}-product-name` }>
            {`${beer.name}`}
          </Table.Cell>
          <Table.Cell data-testid={ `${index}-order-unit-price` }>
            {`(R$ ${(beer.total / beer.quantity)
              .toFixed(2)
              .toString()
              .replace('.', ',')})`}
          </Table.Cell>
          <Table.Cell data-testid={ `${index}-product-total-value` }>
            {`R$ ${beer.total.toFixed(2).toString().replace('.', ',')}`}
          </Table.Cell>
        </Table.Row>
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
