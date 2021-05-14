import React, { useEffect, useState } from 'react';
import dateFormat from 'dateformat';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import HeaderAdmin from '../../components/HeaderAdmin';
import { fetchUpdateStatus } from '../../services';

export default function OrderDetailsAdmin(props) {
  const { match: { params: { id } } } = props;

  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderDate, setOrderDate] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visibility, setVisibility] = useState(true);

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

  const handleDeliveredButton = async (event) => {
    event.preventDefault();
    await fetchUpdateStatus(id);
    setOrderStatus('Entregue');
    setVisibility(false);
  };

  return isLoading ? (
    <div>Loading...</div>
  )
    : (
      <div>
        <HeaderAdmin namePage="Admin - Detalhe de Pedido" />
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
                <div data-testid={ `${index}-order-unit-price` }>
                  {`(R$ ${product.price.toString().replace('.', ',')})`}
                </div>
                <div data-testid={ `${index}-product-total-value` }>
                  {`R$ ${parseFloat(product.total)
                    .toFixed(2).toString().replace('.', ',')}`}
                </div>
              </li>
            ))}
          </ul>
          <div data-testid="order-total-value">
            {`R$ ${totalPrice.toString().replace('.', ',')}`}
          </div>
          {visibility ? (
            <Button
              data-testid="mark-as-delivered-btn"
              variant="primary"
              type="button"
              className="form__login__btn"
              visibility={ visibility }
              onClick={ (event) => handleDeliveredButton(event) }
            >
              Marcar como entregue
            </Button>)
            : (<div />)}
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
