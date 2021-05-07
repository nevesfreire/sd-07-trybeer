import React from 'react';
import PropTypes from 'prop-types';

export default function AdminOrdersID({ match }) {
  const { params } = match;
  return (
    <div>
      <h1>
        Admin-pedido
        {params.id}
      </h1>
    </div>
  );
}

AdminOrdersID.propTypes = {
  match: PropTypes.isRequired,
};
