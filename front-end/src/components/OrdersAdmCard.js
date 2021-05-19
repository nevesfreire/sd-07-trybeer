import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'react-bulma-components';

function OrdersAdmCard({ order, index }) {
  const history = useHistory();
  const { sale, address, number, status, total_price: price } = order;
  let totalPrice = price;
  totalPrice = totalPrice.split('.').join(',');

  const handleClick = () => history.push(`/admin/orders/${sale}`);

  return (
    <Card
      className="m-2 column is-two-quarters"
      onClick={ () => handleClick() }
      style={ { maxWidth: '46rem', minWidth: '46rem', minHeight: '14rem', maxHeight: '14rem' } }
    >
      <header className="card-header">
        <p
          className="card-header-title is-size-4"
          data-testid={ `${index}-order-number` }
        >
          {`Pedido ${sale}`}
        </p>
      </header>

      <div className="card-content">
        <div
          className="content is-size-4"
          data-testid={ `${index}-order-address` }
        >
          {`${address}, ${Number(number)}`}
        </div>
        <footer className="card-footer">
          <span
            className="card-header-item is-size-4"
            data-testid={ `${index}-order-total-value` }
          >
            {`R$ ${totalPrice}`}
          </span>
          <span
            className="card-footer-item is-size-4"
            data-testid={ `${index}-order-status` }
          >
            {status}
          </span>
        </footer>
      </div>
    </Card>
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
