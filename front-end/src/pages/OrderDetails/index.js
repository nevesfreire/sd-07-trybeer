import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../context';

import { ClientMenu, OrderItemDetails } from '../../components';

import api from '../../services/api';

import './styles.css';

function OrderDetails({ match }) {
  const { orders } = useContext(Context);

  const [order, setOrder] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  const { id } = match.params;
  const user = JSON.parse(localStorage.getItem('user')) || { name: null, role: null };

  useEffect(() => {
    if (!orders.length) {
      api.getAllOrders(user.token).then((response) => {
        if (response.error) {
          setMessage('Nenhum pedido encontrado');
        } else {
          setOrder(response.message.find((item) => item.id === Number(id)));
        }
      });
    } else {
      setOrder(orders.find((item) => item.id === Number(id)));
    }
  }, [id, orders, orders.length, user.token]);

  useEffect(() => {
    api.getOrderDetailsById(user.token, id).then((response) => {
      if (response.error) {
        setMessage('Nenhum pedido encontrado');
      } else {
        setOrderDetails(response.message);
      }
      setIsLoading(false);
    });
  }, [order, user.token, id]);

  const formatDate = () => {
    // const fullDate = order.sale_date.split('T');
    // const date = fullDate[0].split('-');
    // return `${date[2]}/${date[1]}`;

    const date = new Date(order.sale_date);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  };

  const formatPrice = (price) => {
    const priceConverted = Number(price).toFixed(2);
    return `R$ ${priceConverted.replace(/\./g, ',')}`;
  };

  return (
    <>
      <ClientMenu title="Detalhes de Pedido" />
      { isLoading
        ? <h1 className="loading">Carregando</h1>
        : (
          <section className="order-details-container">
            <h1 data-testid="order-number">{`Pedido ${id}`}</h1>
            <section className="order-details-list">
              { orderDetails.map((item, index) => (
                <OrderItemDetails
                  key={ index }
                  orderDetails={ item }
                  index={ index }
                  formatPrice={ formatPrice }
                />))}
              <h1 data-testid="order-total-value">
                {`Total: ${formatPrice(order.total_price)}`}
              </h1>
              <p data-testid="order-date">{`Data pedido: ${formatDate()}`}</p>
            </section>
            <h2>{message}</h2>
          </section>
        )}
    </>
  );
}

OrderDetails.propTypes = {
  match: PropTypes.objectOf(),
}.isRequired;

export default OrderDetails;
