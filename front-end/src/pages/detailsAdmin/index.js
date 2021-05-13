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

  /* useEffect(() => {
    const fetchSale = async () => {
      const orderData = await saleById(orderId);
      setOrder(orderData);
    };
    fetchSale();
  }, [orderStatus, orderId]);
  */

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
        <span data-testid="order-number">{`Pedido ${orderId} -`}</span>
        <span data-testid="order-status">{` ${orderStatus}`}</span>
      </h1>
      <div>
        {order && order.map((product, index) => (
          <div
            key={ index }
          >
            <span data-testid={ `${index}-product-qtd-input` }>{product.qtd}</span>
            <span data-testid={ `${index}-product-name` }>{ ` ${product.name} ` }</span>
            <span data-testid={ `${index}-product-total-value` }>
              { ` R$ ${(product.qtd * parseFloat(product.unitPrice))
                .toFixed(2).split('.').join(',')} ` }
            </span>
            <span data-testid={ `${index}-product-unit-price` }>
              { ` (R$ ${parseFloat(product.unitPrice)
                .toFixed(2).split('.').join(',')} un) ` }
            </span>
          </div>
        ))}
      </div>
      { shouldButtonRender() }
    </div>
  );
}
