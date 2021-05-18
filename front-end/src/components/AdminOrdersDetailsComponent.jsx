import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import { MainComponentContainer } from '../styled/AdminContainers.styled';
import { MainButton } from '../styled/Buttons.styled';

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
    <MainComponentContainer>
      <ul>
        <li>
          <span data-testid="order-number">{`Pedido ${id} - `}</span>
          <span data-testid="order-status">{status}</span>
        </li>
        <li data-testid="order-total-value">
          {`Total: R$ ${totalPrice.toFixed(2).toString().replace('.', ',')}`}
        </li>
      </ul>
      <table>
        <thead>
          <tr>
            <th> Quantidade </th>
            <th> Produto </th>
            <th> Total por produto </th>
            <th> Valor unitário </th>
          </tr>
        </thead>
        <tbody>
          {order.map((product, index) => (
            <tr key={product.name}>
              <th data-testid={`${index}-product-qtd`}>{product.quantity}</th>
              <th data-testid={`${index}-product-name`}>{`${product.name} `}</th>
              <th
                data-testid={`${index}-product-total-value`}
              >
                {
                  `R$ ${(product.quantity * product.price)
                    .toFixed(2).toString().replace('.', ',')} `
                }
              </th>
              <th
                data-testid={`${index}-order-unit-price`}
              >
                {`(R$ ${(product.price * 1).toFixed(2).toString().replace('.', ',')}) `}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      {status === 'Pendente' && (
        <MainButton
          type="button"
          data-testid="mark-as-delivered-btn"
          onClick={handleDelivered}
        >
          Marcar como entregue
        </MainButton>)}
    </MainComponentContainer>)
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
