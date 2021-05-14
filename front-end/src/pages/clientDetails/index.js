import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import TopMenu from '../../components/TopMenu';
import { saleById } from '../../service/trybeerApi'

export default function ClientDetails() {
  const [errors, setErrors] = useState('');
  const [orderDetail, setOrderDetail] = useState([]);
  const orderNumber = useParams().np;
  const orderTotValue = orderDetail
    .reduce((acc, { qtd, unitPrice }) => acc + (qtd * unitPrice), 0);

  const salesProducts = async () => {
    const result = await saleById(orderNumber);

    if (!result.length === 0) return setErrors(<h3>Pedido não encontrado</h3>);

    setOrderDetail(result);
  }

  useEffect(() => {
    salesProducts();
  }, []);

  return (
    <div>
      <TopMenu topTitle="Detalhes de Pedido" />
      <h2>
        <span data-testid="order-number">{ `Pedido ${orderNumber}` }</span>
        {' '}
        <span data-testid="order-date">{ `${Date.now("mm/YY")}` }</span>
      </h2>
      <div>
        {orderDetail && orderDetail.map((product, index) => (
          <div
            key={ index }
          >
            <div>
              <span data-testid={ `${index}-product-qtd` }>
                {product.qtd}
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
                  {`R$ ${product.unitPrice.replace('.', ',') }`}
                </strong>
              </span>
            </div>
          </div>
        ))}
        <p data-testid="order-total-value" >
          {`R$ ${(orderTotValue).toFixed(2).replace('.', ',')}`}
        </p>
      </div>
      { errors }
    </div>
  );
}