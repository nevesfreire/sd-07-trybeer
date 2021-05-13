import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Button } from 'react-bootstrap';
import Header from '../../components/Header';
// import { useHistory } from 'react-router-dom';

export default function OrderDetailsUser(props) {
  const { match: { params: { orderId } } } = props;

  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    if (localStorageUser === null) {
      history.push('/login');
    } else {
      setIsLoading(true);
      fetch(`http://localhost:3001/sales/products/${orderId}`)
        .then((response) => response.json())
        .then((products) => {
          setOrder(products);
          console.log(products);
          setIsLoading(false);
        });
    }
  }, [history, orderId, setIsLoading]);

  return isLoading ? (
    <div>Loading...</div>
  )
    : (
      <div>
        <Header namePage="Detalhes de Pedido" />
        <main>
          <h2 data-testid="order-number">
            {`Pedido ${orderId}`}
          </h2>
          <p data-testid="order-date">
            Data do pedido
          </p>
          <ul>
            {order.map((product, index) => (
              <li key={ index }>
                <div data-testid={ `${index}-product-qtd` }>{product.qtd}</div>
                <div data-testid={ `${index}-product-name` }>{product.nome}</div>
                <div data-testid={ `${index}-product-total-value` }>
                  {`R$ ${product.total.toString().replace('.', ',')}`}
                </div>
              </li>
            ))}
          </ul>
          <div data-testid="order-total-value">
            Total do pedido
          </div>
        </main>
      </div>);
}

OrderDetailsUser.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      orderId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
