import React, { useEffect, useState } from 'react';
import dateFormat from 'dateformat';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Button } from 'react-bootstrap';
import Header from '../../components/Header';

export default function OrderDetailsUser(props) {
  const { match: { params: { orderId } } } = props;

  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderDate, setOrderDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  function fdate(date) {
    const newDate = new Date(date);
    const day = dateFormat(newDate, 'dd/mm');
    return day;
  }

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    if (localStorageUser === null) {
      history.push('/login');
    } else {
      setIsLoading(true);
      fetch(`http://localhost:3001/sales/details/${orderId}`)
        .then((response) => response.json())
        .then((order) => {
          setOrderDate(fdate(order.saleDetail.sale_date));
          setTotalPrice(order.saleDetail.total_price);
          setProducts(order.products);
          console.log(order);
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
            {orderDate}
          </p>
          <ul>
            {products.map((product, index) => (
              <li key={ index }>
                <div data-testid={ `${index}-product-qtd` }>{product.qtd}</div>
                <div data-testid={ `${index}-product-name` }>{product.nome}</div>
                <div data-testid={ `${index}-product-total-value` }>
                  {`R$ ${product.price.toString().replace('.', ',')}`}
                </div>
                <div data-testid={ `${index}-product-total-value` }>
                  {`R$ ${product.total.toString().replace('.', ',')}`}
                </div>
              </li>
            ))}
          </ul>
          <div data-testid="order-total-value">
            {`R$ ${totalPrice.toString().replace('.', ',')}`}
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
