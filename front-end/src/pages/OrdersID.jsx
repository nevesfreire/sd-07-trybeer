import React from 'react';
import PropTypes from 'prop-types';

export default function OrdersID({ match }) {
  const { params } = match;
  return (
    <div>
      <h1>
        Cliente-pedido
        {params.id}
      </h1>
    </div>
  );
}

OrdersID.propTypes = {
  match: PropTypes.isRequired,
};