import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function AdminCardOrder(props) {
  const { order, index } = props;
  const total = parseFloat(order.total_price).toFixed(2);

  return (
    <Link to={ `/admin/orders/${order.id}` }>
      <div
        style={ { marginLeft: '300px' } }
      >
        <div data-testid={ `${index}-order-number` }>
          {`Pedido ${order.id}`}
        </div>
        <div data-testid={ `${index}-order-address` }>
          { `${order.street}, ${order.houseNumber}`}
        </div>
        <div
          data-testid={ `${index}-order-total-value` }
        >
          {`R$ ${total.toString().replace('.', ',')}`}
        </div>
        <div data-testid={ `${index}-order-status` }>
          { order.status }
        </div>
      </div>
    </Link>
  );
}

AdminCardOrder.propTypes = {
  index: PropTypes.number.isRequired,
  order: PropTypes.shape({
    id: PropTypes.number,
    total_price: PropTypes.number,
    sale_date: PropTypes.string,
    street: PropTypes.string,
    houseNumber: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default AdminCardOrder;
