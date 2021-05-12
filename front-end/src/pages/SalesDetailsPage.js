import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MenuTop from '../components/MenuTop';
import Details from '../components/Details';
import { fetchOrderById, updateOrderById } from '../services/api';

function SalesDetailsPage() {
  const history = useHistory();
  const [order, setOrder] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const params = useParams();

  async function getOrder() {
    const list = await fetchOrderById(params.id);
    setOrder(list);
    setOrderStatus(list.sale.status);
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      history.push('/login');
    } else {
      getOrder();
    }
  }, [history]);

  const getDate = (date) => {
    const [, month, day] = date.split('-');
    return `${day.substring(0, 2)}/${month}`;
  };

  if (!order) return null;
  const { sale, products } = order;

  const confirmDelivery = async () => {
    const result = await updateOrderById(sale.id);
    if (result) setOrderStatus('Entregue');
  };

  return (
    <div className="form-page checkout-page">
      <MenuTop title="Detalhes de Pedido" />
      <div className="admin-container">
        <div className="adm-title">
          <div className="order-data">
            <p  data-testid="order-number">
              {`Pedido ${sale.id}`}
            </p>
            <p className={orderStatus} data-testid="order-status">
              {orderStatus}
            </p>
          </div>
          <div className="order-date">
            <p data-testid="order-date">{getDate(sale.sale_date)}</p>
          </div>
        </div>
        {products.map((product, index) => (
          <Details key={ index } item={ product } index={ index } />
        ))}
        <div class="adm-total">
          Total:
          <p data-testid="order-total-value">
            R$
            {' '}
            {sale.total_price.toString().replace('.', ',')}
          </p>
        </div>
        <button
          className="btn btn-generic"
          type="button"
          hidden={ sale.status === 'Entregue' }
          onClick={ () => confirmDelivery() }
          data-testid="mark-as-delivered-btn"
        >
          Marcar como entregue
        </button>
      </div>

    </div>
  );
}

export default SalesDetailsPage;
