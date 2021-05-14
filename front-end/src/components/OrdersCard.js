import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function OrdersCard({ item, index }) {
  console.log(item);
  const { sale, address, number, status } = item;
  let { totalPrice } = item;
  totalPrice = totalPrice.split('.').join(',');
  return (
    <div className="card">
      <Link to={ `/admin/orders/${sale}` }>
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
            {`${address} ${Number(number)}`}
          </div>
          <footer className="card-footer">
            <span
              className="card-header-item"
              data-testid={ `${index}-order-total-value"` }
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
      </Link>
    </div>
  );
}

OrdersCard.propTypes = {
  item: PropTypes.shape({
    user: PropTypes.string,
    address: PropTypes.string,
    urlImage: PropTypes.string,
    status: PropTypes.string,
    totalPrice: PropTypes.string,
    number: PropTypes.string,
    sale: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default OrdersCard;
