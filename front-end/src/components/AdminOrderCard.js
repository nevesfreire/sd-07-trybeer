import React from 'react';
import { Redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function OrderCard({ order, pos }) {
  const { id, deliveryAddress, totalPrice, status } = order;
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleClick = () => {
    setShouldRedirect(`/admin/orders/${order.id}`);
  }

  return (
/*     <Link to={ `/admin/orders/${order.id}` }></Link> */
    <button type="button" onClick={ () => handleClick() }>
      { shouldRedirect && <Redirect to={ shouldRedirect } /> }
      <span data-testid={ `${pos}-order-number` }>{ `Pedido ${id}` }</span>
      <span data-testid={ `${pos}-order-address` }>{ deliveryAddress }</span>
      <span data-testid={ `${pos}-order-total-value` }>{ totalPrice }</span>
      <span data-testid={ `${pos}-order-status` }>{ status }</span>
    </button>
  );
}

OrderCard.propTypes = {
  order: PropTypes.objectOf.isRequired,
  pos: PropTypes.objectOf.isRequired,
};
