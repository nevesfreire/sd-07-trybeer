import React from 'react';
import { useParams } from 'react-router-dom'
import TopMenu from '../../components/TopMenu';

export default function ClientDetails() {
  const orderNumber = useParams().np;
  console.log(orderNumber)
  const orderDetail = JSON.parse(localStorage.getItem('cart'));
  console.log(orderDetail);
  const orderTotValue = orderDetail
    .reduce((acc, { quantity, price }) => acc + (quantity * price), 0);

  return (
    <div>
      <TopMenu topTitle="Detalhes de Pedido" />
      <h2>
        <span data-testid="order-number">{ `Pedido ${orderNumber}` }</span>
        {' '}
        <span data-testid="order-date">{ `${Date.now("mm/YY")}` }</span>
      </h2>
      <div>
        {orderDetail && orderDetail.filter((product) =>
          product.id === Number.parseInt(orderNumber))
          .map((product, index) => (
          <div
            key={ index }
          >
            <div>
              <span data-testid={ `${index}-product-qtd` }>
                {product.quantity}
              </span>
              {' '}
              -
              {' '}
              <span data-testid={ `${index}-product-name` }>
                {product.name}
              </span>
              {' '}
              -
              {' '}
              <span data-testid={ `${index}-product-total-value` }>
                <strong>
                  {`R$ ${product.price.replace('.', ',') }`}
                </strong>
              </span>
            </div>
          </div>
        ))}
        <p data-testid="order-total-value" >
          {`R$ ${(orderTotValue).toFixed(2).replace('.', ',')}`}
        </p>
      </div>
    </div>
  );
}