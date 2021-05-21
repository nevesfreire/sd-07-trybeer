import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function OrderCard({ order, position }) {
  const check = moment(order.sale_date , 'YYYY/MM/DD').format('DD/MM');
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleClick = () => {
    setShouldRedirect(`/orders/${order.id}`);
  }
{/* <Link to={ `/orders/${order.id}` }></Link> */}
  console.log(order);
  return (
      
      <button type="button" onClick={ () => handleClick() } data-testid={ `${position}-order-card-container` }>
        { shouldRedirect && <Redirect to={ shouldRedirect } /> }
        <span data-testid={ `${position}-order-number` }>{ `Pedido ${order.id}` }</span>
        <span data-testid={ `${position}-order-date` }>
          { check }
        </span>
        <span data-testid={ `${position}-order-total-value` }>
          { `R$ ${new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })
            .format(order.total_price)}` }</span>
      </button>

  );
}

OrderCard.propTypes = {
  order: PropTypes.objectOf.isRequired,
  position: PropTypes.objectOf.isRequired,
};
