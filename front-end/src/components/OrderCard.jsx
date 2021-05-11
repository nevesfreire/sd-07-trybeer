import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import { Redirect } from 'react-router';

const OrderCard = (props) => {
  const { data } = props;
  const { key, order } = data;
  const [redirect, setRedirect] = useState(false);
  const { sale_date: date, total_price: price, id } = order;
  const accPrice = parseFloat(price).toFixed(2).toString().replace('.', ',');

  if (redirect) return <Redirect to={ `/orders/${id}` } />;
  console.log(data);

  return (
    <div
      data-testid={
        `${key}-order-card-container`
      }
      onClick={ () => setRedirect(true) }
      role="button"
      onKeyDown={ () => setRedirect(true) }
      tabIndex={ 0 }
    >
      <p data-testid={ `${key}-order-number` }>{`Pedido ${id}`}</p>
      <h3 data-testid={ `${key}-order-date` }>{dateFormat(date, 'dd/mm')}</h3>
      <p data-testid={ `${key}-order-total-value` }>{`R$ ${accPrice}`}</p>
    </div>);
};

OrderCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default OrderCard;
