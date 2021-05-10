import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../../Components/TopBar';
import { getSalesByUser } from '../../servicesAPI/api';

const ClientOrders = () => {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getClientSales = async () => {
    if (JSON.parse(localStorage.getItem('user'))) {
      const { data: { token } } = JSON.parse(localStorage.getItem('user'));
      const salesResponse = await getSalesByUser(token);
      setSales(salesResponse);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getClientSales();
  }, []);

  return (
    <div>
      <TopBar />
      { !isLoading && sales.map(({ id, sale_date: date, total_price: price }, index) => (
        <Link key={ id } to={ `/orders/${id}` }>
          <div key={ id } data-testid={ `${index}-order-card-container` }>
            <p data-testid={ `${index}-order-number` }>{ `Pedido ${id}` }</p>
            <p data-testid={ `${index}-order-date` }>{ date }</p>
            <p
              data-testid={ `${index}-order-total-value` }
            >
              {`R$ ${(Number(price)).toFixed(2).replace('.', ',')}`}
            </p>
          </div>
        </Link>
      )) }
    </div>
  );
};

export default ClientOrders;
