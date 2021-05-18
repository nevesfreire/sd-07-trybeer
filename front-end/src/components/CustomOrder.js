import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import { fetchOrderDetails } from '../service/order';

function CustomOrder({ index, beer }) {
  fetchOrderDetails(beer.id);
  return (
    <Link to={ `/orders/${beer.id}` }>
      <div>
        {!beer ? (
          null
        ) : (

          <Card data-testid={ `${index}-order-card-container` } style={ { margin: 10 } }>
            <Card.Content>
              <Card.Header data-testid={ `${index}-order-number` }>
                {`Pedido ${beer.id}`}
              </Card.Header>
              <Card.Meta data-testid={ `${index}-order-date` }>
                {`Data ${beer.sale_date.split('T')[0].split('-')[2]}/${beer.sale_date
                  .split('T')[0].split('-')[1]}`}
              </Card.Meta>

              <Card.Description
                data-testid={ `${index}-order-total-value` }
              >
                {`R$ ${(beer.total_price).replace('.', ',')}`}
              </Card.Description>
            </Card.Content>
          </Card>
        )}
      </div>
    </Link>
  );
}

CustomOrder.propTypes = {
  index: PropTypes.number.isRequired,
  beer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    total_price: PropTypes.number.isRequired,
    sale_date: PropTypes.string.isRequired,
  }).isRequired,
};

export default CustomOrder;
