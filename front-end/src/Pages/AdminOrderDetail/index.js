import React, { useState, useEffect } from 'react';
import SideBar from '../../Components/SideBar';
// import { getSalesById, updateSale } from '../../servicesAPI/api';

const AdminOrderDetail = () => {
  const role = 'administrator';
  const [isLoading, setIsLoading] = useState(true);
  const [sale, setSale] = useState([]);
  const [status, setStatus] = useState('');

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem('user'))) {
  //     const { data: { token } } = JSON.parse(localStorage.getItem('user'));
  //     const salesResponse = await getSalesById(token);
  //     setStatus(salesResponse.status);
  //     setSale(salesResponse);
  //     setIsLoading(false);
  //   }
  // }, []);

  const obj = {
    saleDate: '26/04',
    totalPrice: 10.00,
    saleId: 1,
    products: [
      {
        quantity: 9,
        name: 'Main group 18',
        price: 3.49,
      },
      {
        quantity: 3,
        name: 'Main group 17',
        price: 1.4,
      },
      {
        quantity: 7,
        name: 'Main group 10',
        price: 1.99,
      },
    ],
    status: 'Pendente',
  };

  useEffect(() => {
    setSale(obj);
    setStatus(obj.status);
    setIsLoading(false);
  }, []);

  const markAsDelivered = async () => {
    const { data: { token } } = JSON.parse(localStorage.getItem('user'));
    // await updateSale(token, sale.saleId);
    setStatus('Entregue');
  }

  return (
    <div>
      <SideBar role={ role } />
      {isLoading ? <div>Carregando</div> : (
        <div>
          <h3>
            <span data-testid="order-number">{ `Pedido ${sale.saleId}` }</span>
            <span> - </span>
            <span data-testid="order-status">{ status }</span>
          </h3>
          { sale.products.map((product, index) => {
            const total = (Math.round((product.price * product.quantity) * 100)) / 100;
            return (
              <div key={ index }>
                <span data-testid={ `${index}-product-qtd` }>{ product.quantity }</span>
                <span data-testid={ `${index}-product-name` }>{ product.name }</span>
                <span
                  data-testid={ `${index}-unit-price`}
                >
                  { `(R$ ${product.price.toFixed(2).replace('.', ',')})` }
                </span>
                <span
                  data-testid={ `${index}-product-total-value` }
                >
                  { `R$ ${total.toFixed(2).replace('.', ',')}` }
                </span>
              </div>
            );
          })}
          <div
            data-testid="order-total-value"
          >
            { `Total: R$ ${sale.totalPrice.toFixed(2).replace('.', ',')}` }
          </div>
          <button
            type="button"
            data-testid="mark-as-delivered-btn"
            hidden={ status === 'Entregue' }
            onClick={ () => markAsDelivered() }
          >
            Marcar como entregue
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminOrderDetail;
