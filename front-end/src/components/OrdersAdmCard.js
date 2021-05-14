import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function OrdersAdmCard({ order, index }) {
  const history = useHistory();
  const { sale, address, number, status, total_price: price } = order;
  let totalPrice = price;
  totalPrice = totalPrice.split('.').join(',');

  const handleClick = () => history.push(`/admin/orders/${sale}`);

  return (
    <div className="card">
      <button type="button" onClick={ () => handleClick() }>
        <header className="card-header">
          <p
            className="card-header-title"
            data-testid={ `${index}-order-number` }
          >
            {`Pedido ${sale}`}
          </p>
        </header>

        <div className="card-content">
          <div
            className="content"
            data-testid={ `${index}-order-address` }
          >
            {`${address}, ${Number(number)}`}
          </div>
          <footer className="card-footer">
            <span
              className="card-header-item"
              data-testid={ `${index}-order-total-value` }
            >
              {`R$ ${totalPrice}`}
            </span>
            <span
              className="card-footer-item"
              data-testid={ `${index}-order-status` }
            >
              {status}
            </span>
          </footer>
        </div>
      </button>
    </div>
  );
}

OrdersAdmCard.propTypes = {
  order: PropTypes.shape({
    user: PropTypes.string,
    address: PropTypes.string,
    urlImage: PropTypes.string,
    status: PropTypes.string,
    totalPrice: PropTypes.string,
    total_price: PropTypes.string,
    number: PropTypes.string,
    sale: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default OrdersAdmCard;
