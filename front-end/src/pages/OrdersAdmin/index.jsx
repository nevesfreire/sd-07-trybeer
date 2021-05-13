import React, { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import { useHistory, Link } from 'react-router-dom';
import HeaderAdmin from '../../components/HeaderAdmin';

export default function OrderAdmin() {
  const [productsOrders, setProductsOrders] = useState();
  const history = useHistory();
  useEffect(() => {
    const userid = JSON.parse(localStorage.getItem('user'));
    if (userid === null) {
      history.push('/login');
    } else {
      fetch('http://localhost:3001/sales/')
        .then((response) => response.json())
        .then((responseJSON) => {
          setProductsOrders(responseJSON);
          console.log(responseJSON);
        });
    }
  }, [history]);

  function fdate(date) {
    const newDate = new Date(date);
    const day = dateFormat(newDate, 'dd/mm');
    return day;
  }

  return (
    <div>
      <HeaderAdmin namePage="Admin - Pedidos" />
      <main>
        <div data-testid="top-title">
          <h1>Meus Pedidos</h1>
        </div>
        <div>
          {productsOrders ? productsOrders.map((products, index) => (
            <div
              key={ products.id }
            >
              <Link to={ `/admin/orders/${products.id}` }>
                <p data-testid={ `${index}-order-card-container` } />
                <p data-testid={ `${index}-order-number` }>
                  Pedido
                  {' '}
                  {products.id}
                </p>
                <p data-testid={ `${index}-order-date` }>
                  {
                    fdate(products.sale_date)
                  }
                </p>
                <p data-testid={ `${index}-order-address` }>
                  Endereço:
                  {' '}
                  {`${products.delivery_address}, ${products.delivery_number}`}
                </p>
                <p data-testid={ `${index}-order-total-value` }>
                  R$
                  {' '}
                  {products.total_price.toString().replace('.', ',')}
                </p>
                <p data-testid={ `${index}-order-status` }>
                  {products.status}
                </p>
              </Link>
            </div>
          )) : null}
        </div>
      </main>
    </div>
  );
}
