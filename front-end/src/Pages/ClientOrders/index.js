import React, { useState, useEffect } from 'react';
import TopBar from '../../Components/TopBar';
// import PropTypes from 'prop-types';

const ClientOrders = () => {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const getClientSales = async () => {
  //   const { data: { token } } = JSON.parse(localStorage.getItem('user'));
  //   const salesResponse = await getSalesByUser(token);
  //   setSales(salesResponse);
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   getClientSales();
  // }, []);

  useEffect(() => {
    setSales([{
      id: 1,
      sale_date: '26/04',
      total_price: 20.5,
    },
    {
      id: 2,
      sale_date: '25/05',
      total_price: 60.5,
    },
    ]);
    setIsLoading(false);
  }, []);

  return (
    <div>
      <TopBar />
      { !isLoading && sales.map(({ id, sale_date: date, total_price: price }, index) => (
        <div key={ id } data-testid={ `${index}-order-card-container` }>
          <p data-testid={ `${index}-order-number` }>{ `Pedido ${id}` }</p>
          <p data-testid={ `${index}-order-date` }>{ date }</p>
          <p
            data-testid={ `${index}-order-total-value` }
          >
            {`R$ ${(Number(price)).toFixed(2).replace('.', ',')}`}
          </p>
        </div>
      )) }
    </div>
  );
};

// ClientOrders.propTypes = {};

export default ClientOrders;
