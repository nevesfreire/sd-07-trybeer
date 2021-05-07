import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CardOrder(props) {
  const { order, index } = props;
  const { sale_date: saleDate } = order;
  const dSplited = saleDate.split('/');
  const completeDate = new Date(dSplited[2], dSplited[1], dSplited[0]);
  const day = completeDate.getDate();
  const month = completeDate.getMonth();
  const formatedDate = `${day}/${month}`;

  return (
    <Link to={ `/orders/${order.id}` }>
      <div
        style={ { border: '1px solid black', width: '150px', marginLeft: '100px' } }
        data-testid={ `${index}-order-card-container` }
      >
        <div data-testid={ `${index}-order-number` }>
          {`Pedido ${order.id}`}
        </div>
        <div
          data-testid={ `${index}-order-date` }
        />
        { formatedDate }
        <div
          data-testid={ `${index}-order-total-value` }
        >
          {` R$ ${order.total_price}`}
        </div>
      </div>
    </Link>
  );
}

CardOrder.propTypes = {
  index: PropTypes.number.isRequired,
  order: PropTypes.shape({
    id: PropTypes.number,
    total_price: PropTypes.number,
    sale_date: PropTypes.string,
  }).isRequired,
};

export default CardOrder;
