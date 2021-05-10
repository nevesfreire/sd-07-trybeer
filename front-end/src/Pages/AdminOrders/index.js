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
      sale_id: 1,
      delivery_address: 'Rua A',
      delivery_number: '123',
      total_price: 110.19,
      status: 'Pendente',
    },
    {
      sale_id: 3,
      delivery_address: 'Rua B',
      delivery_number: '456',
      total_price: 11.19,
      status: 'Entregue',
    },
    {
      sale_id: 4,
      delivery_address: 'Rua C',
      delivery_number: '7',
      total_price: 19,
      status: 'Pendente',
    },
  ];

  useEffect(() => {
    setSales(obj);
    setIsLoading(false);
  }, [obj]);

  return (
    <div>
      <SideBar role={ role } />
      { isLoading ? <div>Loading</div> : (
        <div>
          <h2>Pedidos</h2>
          { sales.map((sale, index) => (
            <Link to={ `/admin/orders/${sale.sale_id}` } key={ index }>
              <div
                data-testid={ `${index}-order-number` }
              >
                { `Pedido ${sale.sale_id}` }
              </div>
              <div
                data-testid={ `${index}-order-address` }
              >
                { `${sale.delivery_address}, ${sale.delivery_number}` }
              </div>
              <span
                data-testid={ `${index}-order-total-value` }
              >
                { `R$ ${sale.total_price.toFixed(2).replace('.', ',')}` }
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
