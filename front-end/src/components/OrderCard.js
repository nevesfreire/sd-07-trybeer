import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

function OrderCard(props) {
  const mystyle = {
    padding: '10px',
    fontFamily: 'Arial',
  };
  const { order, index } = props;
  const history = useHistory();
  const date = new Date(order.sale_date);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const OrderDate = `${day}/${month}`;
  return (
    <div
      role="button"
      tabIndex={ 0 }
      onClick={ () => history.push('/orders/:id') }
      onKeyDown={ () => history.push('/orders/:id') }
      style={ mystyle }
      data-testid={ `${index}-order-card-container` }
    >
      <div>
        <div data-testid={ `${index}-order-number` }>{`Pedido ${order.id}`}</div>
        <div data-testid={ `${index}-order-date` }>{` ${OrderDate}`}</div>
        <div
          data-testid={ `${index}-order-total-value` }
        >
          {` R$ ${order.total_price}`}
        </div>
      </div>

    </div>
  );
}
OrderCard.propTypes = {
  index: PropTypes.number.isRequired,
  order: PropTypes.shape({
    id: PropTypes.number,
    sale_date: PropTypes.string,
    total_price: PropTypes.number,
  }).isRequired,
};

export default OrderCard;
