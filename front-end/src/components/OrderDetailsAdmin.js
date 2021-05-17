import React, { useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import api from '../services/api';

const moment = require('moment');

function OrderDetailsAdmin() {
  const [order, setOrder] = useState([]);
  const [sale, setSale] = useState({});
  const [status, setStatus] = useState('Pendente'); // sale.status não deu certo
  const { id } = useParams();

  const requestProductsByOrderId = () => {
    api
      .get(`/orders/${id}`)
      .then((response) => setOrder(response.data))
      .catch((error) => console.log('error: ', error));
  };

  const requestOrderById = () => {
    api
      .get(`/sales/${id}`)
      .then((response) => setSale(response.data))
      .catch((error) => console.log('error: ', error));
  };

  useEffect(() => {
    requestProductsByOrderId();
    requestOrderById();
  }, []);

  const deliveredItem = () => {
    console.log('DeliveredItem button');
    // tem que mudar o sale.status
    setStatus('Entregue');
  };

  const loggedUser = JSON.parse(localStorage.getItem('data')) || { id: null };

  return (
    <div>
      {loggedUser.id === null && <Redirect to="/login" />}
      {sale ? (
        <div>
          <h1 data-testid="top-title">{`Detalhes de Pedido ${id}`}</h1>
          <h2 data-testid="order-number">{`Pedido ${id}`}</h2>
          <h3 data-testid="order-status">{status}</h3>
          <p data-testid="order-date">
            {moment.utc(sale.sale_date).format('DD/MM')}
          </p>
          <p data-testid="order-total-value">
            {`R$ ${sale.total_price && sale.total_price.replace('.', ',')}`}
          </p>
          {order
            && order.map(({ quantity, name, price }, index) => {
              const totalProductPrice = `${(quantity * price).toFixed(2)}`;
              return (
                <div key={ index }>
                  <p data-testid={ `${index}-product-name` }>{name}</p>
                  <p data-testid={ `${index}-product-qtd` }>{quantity}</p>
                  <p data-testid={ `${index}-order-unit-price` }>
                    {`(R$ ${price.replace('.', ',')})`}
                  </p>
                  <p data-testid={ `${index}-product-total-value` }>
                    {`R$ ${totalProductPrice.replace('.', ',')}`}
                  </p>
                </div>
              );
            })}
          {/* esse link aqui tem que ser refatorado para funcinar pelo menu */}
          <Link to="/admin/orders" data-testid="side-menu-item-orders">
            Meus pedidos admin
          </Link>
          {status === 'Pendente' ? (
            <button
              className="btn-delivered"
              type="button"
              data-testid="mark-as-delivered-btn"
              onClick={ deliveredItem }
            >
              Marcar como entregue
            </button>
          ) : (
            ''
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default OrderDetailsAdmin;
