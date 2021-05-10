import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import { getSales } from '../../servicesAPI/api';

const AdminOrders = () => {
  const role = 'administrator';
  const [isLoading, setIsLoading] = useState(true);
  const [sales, setSales] = useState([]);

  const getSalesResponse = async () => {
    if (JSON.parse(localStorage.getItem('user'))) {
      const { data: { token } } = JSON.parse(localStorage.getItem('user'));
      const salesResponse = await getSales(token);
      setSales(salesResponse);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSalesResponse();
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
                { `R$ ${sale.totalPrice.replace('.', ',')}` }
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
