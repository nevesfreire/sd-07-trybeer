import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

function OrdersCard(props) {
  const { id, saleDate, totalPrice, index } = props;

  const formatDate = () => moment(saleDate).format('DD/MM');

  return (
    <Link to={ `/orders/${id}` }>
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
          data-testid={ `${index}-order-date` }
        >
          {formatDate()}
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

OrdersCard.propTypes = {
  id: PropTypes.number.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default OrdersCard;
