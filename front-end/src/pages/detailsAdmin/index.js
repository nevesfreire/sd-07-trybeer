import React, { useState } from 'react';
// import TrybeerContext from '../../context/TrybeerContext';
import AdminSideBar from '../../components/AdminSideBar';
import { updateSaleStatus } from '../../service/trybeerApi';

const ENTREGUE = 'Entregue';

export default function AdminDetails() {
  // const {  } = useContext(TrybeerContext);
  const [orderId] = useState('1');
  const [orderStatus, setOrderStatus] = useState('Pendente');
  const [order] = useState([
    {
      qtd: 1,
      name: 'Skol Lata 250ml',
      unitPrice: 2.20,
      image: 'http://localhost:3001/images/Skol Lata 350ml.jpg',
    },
    {
      qtd: 1,
      name: 'Heineken 600ml',
      unitPrice: 7.50,
      image: 'http://localhost:3001/images/Heineken 600ml.jpg',
    },
  ]);

  const handleClick = () => {
    updateSaleStatus(ENTREGUE);
    setOrderStatus(ENTREGUE);
  };

  const shouldButtonRender = () => {
    const button = (
      <button
        type="button"
        data-testid="mark-as-delivered-btn"
        onClick={ handleClick }
      >
        Marcar como entregue
      </button>
    );
    return orderStatus !== ENTREGUE ? button : '';
  };

  return (
    <div>
      <AdminSideBar />
      <h1>
        <p data-testid="order-number">{`Pedido ${orderId}`}</p>
        <p data-testid="order-status">{`${orderStatus}`}</p>
      </h1>
      <div>
        {order && order.map((product, index) => (
          <div
            key={ index }
          >
            <div>
              <img
                src={ product.image }
                alt={ product.name }
              />
            </div>
            <div>
              <p data-testid={ `${index}-product-qtd` }>
                {product.qtd}
              </p>
              <p data-testid={ `${index}-product-name` }>
                {product.name}
              </p>
              <p data-testid={ `${index}-product-total-value` }>
                {`R$ ${(product.unitPrice * product.qtd).toFixed(2).replace('.', ',')}`}
              </p>
              <p data-testid={ `${index}-order-unit-price` }>
                <strong>
                  {`(R$ ${product.unitPrice.toFixed(2).replace('.', ',')})`}
                </strong>
              </p>
            </div>
          </div>
        ))}
      </div>
      { shouldButtonRender() }
    </div>
  );
}
