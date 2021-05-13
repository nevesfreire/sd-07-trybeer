import React, { useEffect, useState } from 'react';
import dateFormat from 'dateformat';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Header from '../../components/Header';

export default function OrderDetailsAdmin(props) {
  const { match: { params: { id } } } = props;

  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderDate, setOrderDate] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
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
      fetch(`http://localhost:3001/sales/details/${id}`)
        .then((response) => response.json())
        .then((order) => {
          setTotalPrice(order.saleDetail.total_price);
          setProducts(order.products);
          setOrderDate(fdate(order.saleDetail.sale_date));
          setOrderStatus(order.saleDetail.status);
          console.log(order);
          setIsLoading(false);
        });
    }
  }, [history, id, setIsLoading]);

  const handleDeliveredButton = (event) => {
    event.preventDefault();
    setOrderStatus('Entregue');
  };

  return isLoading ? (
    <div>Loading...</div>
  )
    : (
      <div>
        <Header namePage="Detalhes de Pedido" />
        <main>
          <h2 data-testid="order-number">
            {`Pedido ${id}`}
          </h2>
          <h2 data-testid="order-status">
            {orderStatus}
          </h2>
          <p data-testid="order-date">
            {orderDate}
          </p>
          <ul>
            {products.map((product, index) => (
              <li key={ index }>
                <div data-testid={ `${index}-product-qtd` }>{product.qtd}</div>
                <div data-testid={ `${index}-product-name` }>{product.nome}</div>
                <div data-testid={ `${index}-product-name` }>{product.nome}</div>
                <div data-testid={ `${index}-order-unit-price` }>
                  {`R$ ${product.total.toString().replace('.', ',')}`}
                </div>
              </li>
            ))}
          </ul>
          <div data-testid="order-total-value">
            {`R$ ${totalPrice.toString().replace('.', ',')}`}
          </div>
          <Button
            data-testid="mark-as-delivered-btn"
            variant="primary"
            type="button"
            className="form__login__btn"
            onClick={ (event) => handleDeliveredButton(event) }
          >
            Marcar como entregue
          </Button>
        </main>
      </div>);
}

OrderDetailsAdmin.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
