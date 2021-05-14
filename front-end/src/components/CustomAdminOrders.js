import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Grid } from 'semantic-ui-react';
import { fetchOrderDetails } from '../service/order';

const CustomAdminOrders = ({ index, beer }) => {
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

              <Card.Description
                id="username"
                data-testid={ `${index}-order-total-value` }
              >
                {`R$ ${(beer.total_price).replace('.', ',')}`}
                <label htmlFor="username" data-testid={ `${index}-order-status` }>
                  {beer.status}
                </label>
              </Card.Description>
            </Card.Content>

          </Card>
        )}
      </Grid>
    </Link>
  );
};

CustomAdminOrders.propTypes = {
  index: PropTypes.number.isRequired,
  beer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    delivery_number: PropTypes.string.isRequired,
    delivery_address: PropTypes.string.isRequired,
    total_price: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default CustomAdminOrders;
