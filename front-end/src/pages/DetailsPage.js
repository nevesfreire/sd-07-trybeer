import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MenuTop from '../components/MenuTop';
import Details from '../components/Details';
import { fetchOrderById } from '../services/api';

function DetailsPage() {
  const history = useHistory();
  const [order, setOrder] = useState(false);
  const params = useParams();

  async function getOrder() {
    const list = await fetchOrderById(params.id);
    setOrder(list);
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
  console.log(sale.total_price);
  return (
    <div className="form-page checkout-page">
      <MenuTop title="Detalhes de Pedido" />
      <div className="cart">
        <div>
          <p data-testid="order-number">
            Pedido
            {' '}
            {` ${sale.id}`}
          </p>
          <p data-testid="order-date">{getDate(sale.sale_date)}</p>
        </div>
        <div className="main-container mt-5">
          <div className="item-container mb-3">
            {products.map((product, index) => (
              <Details key={ index } item={ product } index={ index } />
            ))}
          </div>
          Total:
          <p data-testid="order-total-value">
            R$
            {' '}
            {sale.total_price.toString().replace('.', ',')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
