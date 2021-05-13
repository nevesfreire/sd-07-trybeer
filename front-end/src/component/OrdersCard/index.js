import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import BeerAppContext from '../../context/BeerAppContext';

function OrdersCard({ order }) {
  const { convertPrice } = useContext(BeerAppContext);
  const history = useHistory();

  const date = () => {
    const dateOrder = order.sale_date;
    const dateList = dateOrder.split('T')[0];
    const month = dateList.split('-')[1];
    const day = dateList.split('-')[2];
    return `${day}/${month}`;
  };
  return (
    <div
      data-testid={ `${order.id - 1}-order-card-container` }
    >
      <button
        data-testid={ `${order.id - 1}-order-number` }
        type="button"
        onClick={ () => history.push(`/orders/${order.id}`) }
      >
        {`Pedido ${order.id}`}
      </button>
      <p data-testid={ `${order.id - 1}-order-date` }>
        {date()}
      </p>
      <p data-testid={ `${order.id - 1}-order-total-value` }>
        {convertPrice(order.total_price)}
      </p>
    </div>
  );
}

OrdersCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    total_price: PropTypes.string,
    sale_date: PropTypes.string,
  }).isRequired,
};

export default OrdersCard;

// delivery_address: "fasdfasfs"
// delivery_number: "1"
// id: 1
// sale_date: "2021-05-13T15:16:09.000Z"
// status: "Pendente"
// total_price: "15.00"
// user_id: 1
