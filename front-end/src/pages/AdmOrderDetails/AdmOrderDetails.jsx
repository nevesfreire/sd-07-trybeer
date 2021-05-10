import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getStorage, setStorage } from '../../services/localStorage';
import { Header, AdminCardOrderDetail } from '../../components';

function AdmOrderDetails({
  history,
  match: {
    params: { id },
  },
}) {
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const user = getStorage('user');
    if (!user) {
      history.push('/login');
    }
    const data = getStorage('purchase');
    if (data) setCart(data[id - 1]);
    setIsLoading(false);
  }, [history, id, status]);

  function changeStatus() {
    const purchase = getStorage('purchase');
    purchase[id - 1].status = 'Entregue';
    setStorage('purchase', purchase);
    setStatus(true);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header data-testid="top-title">Detalhes do Pedido</Header>
      <div
        data-testid="order-number"
        style={ { marginLeft: '300px' } }
      >
        {`Pedido ${id}`}
      </div>
      <div
        data-testid="order-status"
        style={ { marginLeft: '300px' } }
      >
        {cart.status}
      </div>
      <div>
        {cart.products
          .map((product, index) => (
            <AdminCardOrderDetail
              key={ index }
              cart={ cart }
              product={ product }
              index={ index }
            />))}
      </div>
      <div
        data-testid="order-total-value"
        style={ { marginLeft: '300px' } }
      >
        {`R$ ${parseFloat(cart.total_price).toFixed(2).toString().replace('.', ',')}`}
      </div>
      { !status && (
        <button
          data-testid="mark-as-delivered-btn"
          onClick={ () => changeStatus() }
          style={ { marginLeft: '300px' } }
          type="button"
        >
          Marcar como entregue
        </button>)}
    </div>
  );
}

AdmOrderDetails.propTypes = {
  history: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default AdmOrderDetails;
