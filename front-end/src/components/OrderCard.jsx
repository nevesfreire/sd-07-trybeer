import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import { Redirect } from 'react-router';

const OrderCard = (props) => {
  const { data } = props;
  const { key, order } = data;
  const [redirect, setRedirect] = useState(false);
  const { sale_date: date, total_price: price } = order;
  const accPrice = `R$ ${price.replace('.', ',')}`;

  if (redirect) return <Redirect to={ `/orders/${key + 1}` } />;

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
      <p data-testid={ `${key}-order-number` }>{`Pedido ${key + 1}`}</p>
      <h3 data-testid={ `${key}-order-date` }>{dateFormat(date, 'dd/mm')}</h3>
      <p data-testid={ `${key}-order-total-value` }>{accPrice}</p>
    </div>);
};

OrderCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default OrderCard;
