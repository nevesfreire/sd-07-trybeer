import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AdminSidebar, AdminCardDetails } from '../../components';

import api from '../../services/api';
import { getItem } from '../../services/localStorage';

import './styles.css';

function AdminDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('');

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await api.fetchOrderById(getItem('user').token, id);
      setProducts(response);
      setIsLoading(false);
    })();
  }, [id]);

  useEffect(() => {
    if (!isLoading) setStatus(products[0].status);
  }, [isLoading, products]);

  async function handleDelivery() {
    // const response = await api.updateStatusById(getItem('user').token, id);
    await api.updateStatusById(getItem('user').token, id);
    // const OK = 200;
    // if (response.status === OK) console.log("ok");
    setStatus('Entregue');
  }

  return (
    <div className="admin-home-container">
      <AdminSidebar />
      {isLoading
        ? <h1 className="loading">Carregando</h1>
        : (
          <section className="admin-product-details">
            <header>
              <h1>
                <span data-testid="order-number">{`Pedido ${products[0].sale_id}`}</span>
                <span data-testid="order-status">{`- ${status}`}</span>
              </h1>
            </header>
            <div className="admin-products-list">
              {products.map((product, index) => (
                <AdminCardDetails
                  key={ product.id }
                  data={ product }
                  index={ index }
                />))}
              <div>
                <p>Total:</p>
                <h3 data-testid="order-total-value">
                  {`R$ ${products[0].total_price.replace(/\./g, ',')}`}
                </h3>
              </div>
              {status !== 'Entregue' && (
                <button
                  className="admin-product-delivery"
                  type="submit"
                  data-testid="mark-as-delivered-btn"
                  onClick={ () => handleDelivery() }
                >
                  Marcar como entregue
                </button>
              )}
            </div>
          </section>
        )}
    </div>
  );
}

export default AdminDetails;
