import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import MyContext from '../context/Context';

function OrderCard(props) {
  const { setOrderDetail } = useContext(MyContext);
  const history = useHistory();
  const mystyle = {
    padding: '10px',
    fontFamily: 'Arial',
  };
  const { order, index } = props;
  const date = new Date(order.sale_date);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const orderDate = `${day}/${month}`;
  const { id } = order;
  const { total_price: totalPrice } = order;

  const orderObj = {
    id,
    totalPrice,
    index,
    orderDate,
  };

  const renderOrderDetail = () => {
    setOrderDetail(orderObj);
    history.push('/orders/:id');
  };
  return (
    <div
      role="button"
      tabIndex={ 0 }
      onClick={ () => renderOrderDetail() }
      onKeyDown={ () => renderOrderDetail() }
      style={ mystyle }
      data-testid={ `${index}-order-card-container` }
    >
      <div>
        <div data-testid={ `${index}-order-number` }>{`Pedido ${id}`}</div>
        <div data-testid={ `${index}-order-date` }>{` ${orderDate}`}</div>
        <div
          data-testid={ `${index}-order-total-value` }
        >
          {` R$ ${totalPrice}`}

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
    total_price: PropTypes.string,
  }).isRequired,
};

export default OrderCard;
