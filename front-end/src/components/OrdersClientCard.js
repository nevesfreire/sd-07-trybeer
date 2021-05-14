import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Media, Heading } from 'react-bulma-components';
import PropTypes from 'prop-types';

function OrdersClientCard({ order, index }) {
  const history = useHistory();
  const { sale: { sale, Date, total_price: price } } = order;

  const handleClick = () => {
    history.push(`/orders/${sale}`);
  };

  return (
    <button
      data-testid={ `${index}-order-card-container` }
      type="button"
      onClick={ () => handleClick() }
    >
      <Card>
        <Card.Content>
          <Media.Item>
            <Heading
              data-testid={ `${index}-order-number` }
              size={ 4 }
            >
              {`Pedido ${sale}`}
            </Heading>
            <Heading subtitle size={ 6 } data-testid={ `${index}-order-date` }>
              {`${
                Date
                  .split('T')[0].split('-')[2]}/${Date
                .split('T')[0].split('-')[1]
              }`}
            </Heading>
            <Heading subtitle size={ 6 } data-testid={ `${index}-order-total-value` }>
              {`Total: R$ ${price.split('.').join(',')}`}
            </Heading>
          </Media.Item>
        </Card.Content>
      </Card>
    </button>

  );
}

OrdersClientCard.propTypes = {
  order: order.PropTypes.shape({
    sale: sale.PropTypes.shape({
      sale: PropTypes.string,
      Date: PropTypes.string,
      total_price: PropTypes.string,
    }).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default OrdersClientCard;
