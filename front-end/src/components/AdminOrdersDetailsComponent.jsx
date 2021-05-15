import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

function AdminOrdersDetailsComponent({ match }) {
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState('Pendente');
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState({});
  const { params: { id } } = match;
  const { getOrderById, putSales } = useFetch();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const userRecovered = JSON.parse(savedUser);
    setUser(userRecovered);
    console.log(userRecovered.token);
    getOrderById(userRecovered.token, id).then((data) => setOrder(data));
  }, []);

  const handleDelivered = async () => {
    await putSales(user.token, 'Entregue', id);
    setStatus('Entregue');
  };

  useEffect(() => {
    const total = order.reduce((acumulador, product) => {
      const totalPricePerProduct = Number(product.quantity) * Number(product.price);
      return acumulador + totalPricePerProduct;
    }, 0);
    setTotalPrice(total);
  }, [order]);

  return order ? (
    <>
      <header>
        <div>
          <span data-testid="order-number">{`Pedido ${id} - `}</span>
          <span data-testid="order-status">{status}</span>
        </div>
      </header>
      {order.map((product, index) => (
        <div key={ product.name }>
          <div data-testid={ `${index}-product-qtd` }>{product.quantity}</div>
          <div data-testid={ `${index}-product-name` }>{`${product.name} `}</div>
          <div
            data-testid={ `${index}-product-total-value` }
          >
            {
              `R$ ${(product.quantity * product.price)
                .toFixed(2).toString().replace('.', ',')} `
            }
          </div>
          <div
            data-testid={ `${index}-order-unit-price` }
          >
            {`(R$ ${(product.price * 1).toFixed(2).toString().replace('.', ',')}) `}
          </div>
        </div>
      ))}
      <div data-testid="order-total-value">
        {`Total: R$ ${totalPrice.toFixed(2).toString().replace('.', ',')}`}
      </div>
      {status === 'Pendente' && (
        <button
          type="button"
          data-testid="mark-as-delivered-btn"
          onClick={ handleDelivered }
        >
          Marcar como entregue
        </button>)}
    </>)
    : <span>Loading...</span>;
}

AdminOrdersDetailsComponent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default AdminOrdersDetailsComponent;
