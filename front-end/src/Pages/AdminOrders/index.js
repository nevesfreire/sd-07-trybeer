import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
// import { getSales } from '../../servicesAPI/api';

const AdminOrders = () => {
  const role = 'administrator';
  const [isLoading, setIsLoading] = useState(true);
  const [sales, setSales] = useState([]);

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem('user'))) {
  //     const { data: { token } } = JSON.parse(localStorage.getItem('user'));
  //     const salesResponse = await getSales(token);
  //     setSales(salesResponse);
  //     setIsLoading(false);
  //   }
  // }, []);

  const obj = [
    {
      saleId: 1,
      deliveryAddress: 'Rua A',
      deliveryNumber: '123',
      totalPrice: 110.19,
      status: 'Pendente',
    },
    {
      saleId: 3,
      deliveryAddress: 'Rua B',
      deliveryNumber: '456',
      totalPrice: 11.19,
      status: 'Entregue',
    },
    {
      saleId: 4,
      deliveryAddress: 'Rua C',
      deliveryNumber: '7',
      totalPrice: 19,
      status: 'Pendente',
    },
  ];

  useEffect(() => {
    setSales(obj);
    setIsLoading(false);
  }, []);

  return (
    <div>
      <SideBar role={ role } />
      { isLoading ? <div>Loading</div> : (
        <div>
          <h2>Pedidos</h2>
          { sales.map((sale, index) => (
            <Link to={ `/admin/orders/${sale.saleId}` } key={ index }>
              <div
                data-testid={ `${index}-order-number` }
              >
                { `Pedido ${sale.saleId}` }
              </div>
              <div
                data-testid={ `${index}-order-address` }
              >
                { `${sale.deliveryAddress}, ${sale.deliveryNumber}` }
              </div>
              <span
                data-testid={ `${index}-order-total-value` }
              >
                { `R$ ${sale.totalPrice.toFixed(2).replace('.', ',')}` }
              </span>
              <span data-testid={ `${index}-order-status` }>{ sale.status }</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
