import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import BeerAppContext from '../../context/BeerAppContext';
import { getToLocalStorage } from '../../utils/localStorage';
import './style.css';

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

  const verifyRoleUser = () => {
    const roleUser = getToLocalStorage('user').role;
    return roleUser;
  };

  if (verifyRoleUser() === 'administrator') {
    return (
      <button
        className="order-card-und-container"
        type="button"
        data-testid={ `${order.id - 1}-order-card-container` }
        onClick={ () => history.push(`/admin/orders/${order.id}`) }
      >
        <div className="order-number-address-container">
          <h2 data-testid={ `${order.id - 1}-order-number` }>
            {`Pedido ${order.id}`}
          </h2>
          <h3 data-testid={ `${order.id - 1}-order-address` }>
            {`${order.delivery_address}, ${order.delivery_number}`}
          </h3>
        </div>
        <div className="order-price-status-container">
          <h3 data-testid={ `${order.id - 1}-order-total-value` }>
            {convertPrice(order.total_price)}
          </h3>
          <h2
            className={
              order.status === 'Pendente'
                ? 'order-card-pendente'
                : 'order-card-entregue'
            }
            data-testid={ `${order.id - 1}-order-status` }
          >
            {order.status}
          </h2>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      className="order-card-und-container"
      data-testid={ `${order.id - 1}-order-card-container` }
      onClick={ () => history.push(`/orders/${order.id}`) }
    >
      <div className="order-number-date">
        <h2 data-testid={ `${order.id - 1}-order-number` }>
          {`Pedido ${order.id}`}
        </h2>
        <h3 data-testid={ `${order.id - 1}-order-date` }>{date()}</h3>
      </div>
      <h3
        className="order-price"
        data-testid={ `${order.id - 1}-order-total-value` }
      >
        {convertPrice(order.total_price)}
      </h3>
    </button>
  );
}

OrdersCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    total_price: PropTypes.string,
    sale_date: PropTypes.string,
    delivery_address: PropTypes.string,
    delivery_number: PropTypes.string,
    status: PropTypes.string,
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
