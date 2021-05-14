import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import TrybeerContext from '../../context/TrybeerContext';
import AdminSideBar from '../../components/AdminSideBar';
import { updateSaleStatus, saleById } from '../../service/trybeerApi';

const ENTREGUE = 'Entregue';

export default function AdminDetails() {
  // const {  } = useContext(TrybeerContext);
  const { id } = useParams();
  const [orderId] = useState(id);
  const [orderStatus, setOrderStatus] = useState('Pendente');
  const [totalPrice, setTotalPrice] = useState([]);
  const [order, setOrder] = useState([{
    name: '',
    qtd: '',
    status: '',
    unitPrice: '',
    totalValue: '',
  }]);

  const getOrderValue = (array) => array.map((product) => product.qtd * product.unitPrice)
    .reduce((acc, curr) => acc + curr);

  useEffect(() => {
    const fetchSale = async () => {
      const orderData = await saleById(orderId);
      setOrder(orderData);
      if (orderData.length > 0) {
        setTotalPrice(getOrderValue(orderData));
        setOrderStatus(orderData[0].status || 'Pendente');
      }
    };
    fetchSale();
  }, [orderId]);

  const handleClick = () => {
    updateSaleStatus(ENTREGUE, orderId);
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
            <span data-testid={ `${index}-product-qtd` }>{product.qtd}</span>
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
      <h4 data-testid="order-total-value">
        {
          `Total: ${totalPrice}`
        }
      </h4>
      { shouldButtonRender() }
    </div>
  );
}
