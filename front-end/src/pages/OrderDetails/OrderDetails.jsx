import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getStorage } from '../../services/localStorage';
import { Header, CardOrderDetail } from '../../components';

function OrderDetails({
  history,
  match: {
    params: { id },
  },
}) {
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = getStorage('user');
    if (!user) {
      history.push('/login');
    }
    const data = getStorage('purchase');
    if (data) setCart(data[id - 1]);
    setIsLoading(false);
  }, [history, id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header data-testid="top-title">Detalhes do Pedido</Header>
      <div data-testid="order-number">{`Pedido ${id}`}</div>
      <div data-testid="order-date">{cart.sale_date}</div>
      <div>
        {cart.products
          .map((product, index) => (
            <CardOrderDetail key={ index } product={ product } index={ index } />))}
      </div>
      <div data-testid="order-total-value">
        {`R$ ${parseFloat(cart.total_price).toFixed(2).toString().replace('.', ',')}`}
      </div>
    </div>
  );
}

OrderDetails.propTypes = {
  history: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default OrderDetails;
