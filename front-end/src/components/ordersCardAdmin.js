import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function OrdersCardAdmin(props) {
  const {
    id, deliveryAddress, deliveryNumber, status, totalPrice, index
  } = props;

  return (
    <Link to={ `/admin/orders/${id}` }>
      <section
        data-testid={ `${index}-order-card-container` }
        // onClick={ () => history.push(`/orders/${id}`) }
      >
        <h2
          data-testid={ `${index}-order-number` }
        >
          {`Pedido ${id}`}
        </h2>
        <p
          data-testid={ `${index}-order-address` }
        >
          {`${deliveryAddress}, ${deliveryNumber}`}
        </p>
        <p
          data-testid={ `${index}-order-status` }
        >
          {status}
        </p>
        <h2
          data-testid={ `${index}-order-total-value` }
        >
          {`R$ ${totalPrice.toString().replace('.', ',')}`}
        </h2>
      </section>
    </Link>
  );
}

OrdersCardAdmin.propTypes = {
  id: PropTypes.number.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default OrdersCardAdmin;
