import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.css';

function AdminCard({ data }) {
  const history = useHistory();
  const wasDelivered = 'delivered';

  const {
    id,
    delivery_address: address,
    delivery_number: number,
    total_price: totalPrice,
    status,
  } = data;

  const priceFormat = `R$ ${totalPrice.replace(/\./g, ',')}`;

  return (
    <button
      className="admin-card"
      type="button"
      onClick={ () => history.push(`/admin/orders/${id}`) }
    >
      <main>
        <h3 data-testid={ `${id - 1}-order-number` }>{`Pedido ${id}`}</h3>
        <p data-testid={ `${id - 1}-order-address` }>{`${address}, ${number}`}</p>
      </main>
      <footer>
        <strong data-testid={ `${id - 1}-order-total-value` }>{priceFormat}</strong>
        <h3
          className={ status === 'Entregue' ? wasDelivered : '' }
          data-testid={ `${id - 1}-order-status` }
        >
          {status}
        </h3>
      </footer>
    </button>
  );
}

AdminCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    delivery_address: PropTypes.string.isRequired,
    delivery_number: PropTypes.string.isRequired,
    total_price: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdminCard;
