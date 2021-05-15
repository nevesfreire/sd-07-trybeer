import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Grid } from 'semantic-ui-react';
import { fetchOrderDetails } from '../service/order';

const CustomAdminOrders = ({ index, beer }) => {
  fetchOrderDetails(beer.id);
  return (
    <Link to={ `/admin/orders/${beer.id}` }>
      <Grid style={{ margin: '10px 50px 10px 0' }}>
        {!beer ? (
          null
        ) : (

          <Card data-testid={ `${index}-order-card-container` } style={{ boxShadow: '1px 2px 4px rgba(0, 0, 0, .5)'}}>
            <Card.Content>
              <Card.Header data-testid={ `${index}-order-number` }>
                {`Pedido ${beer.id}`}
              </Card.Header>
              <label htmlFor="username" data-testid={ `${index}-order-status` }>
                {beer.status}
              </label>

              <Card.Meta data-testid={ `${index}-order-address` } style={{ marginTop: 10 }}>
                {`Rua ${beer.delivery_address}, ${beer.delivery_number}`}
              </Card.Meta>

              <Card.Description
                id="username"
                data-testid={ `${index}-order-total-value` }
              >
                {`R$ ${(beer.total_price).replace('.', ',')}`}
                {/* <label htmlFor="username" data-testid={ `${index}-order-status` }>
                  {beer.status}
                </label> */}
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
