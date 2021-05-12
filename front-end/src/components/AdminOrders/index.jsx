import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAdminSales } from '../../services/apiService';
// import { DivOrder } from './styles';

export default function AdminOrders() {
  const [adminSales, setAdminSales] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchSales = async () => {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) return null;
      const response = await getAdminSales(currentUser.token)
        .then((apiResponse) => apiResponse);
      console.log(response);
      if (response && Object.values(response).length > 0) {
        setAdminSales(response);
      }
    };
    fetchSales();
  }, []);

  if (!adminSales) {
    return <p>Loading...</p>;
  }

  return (
    
    
    <div style={ { display: 'flex', justifyContent: 'center' } }>
      { adminSales.err ? <p>{adminSales.err.message}</p>
        : adminSales.map((item, index) => (
          // <p>{console.log(item)}</p>
          <div
            type="button"
            data-testid={ `${index}-order-card-container}` }
            key={ item.id }
            onClick={ () => history.push(`/orders/${item.id}`) }
            role="button"
            onKeyDown={ () => history.push(`/orders/${item.id}`) }
            tabIndex={ 0 }
          >
            <p data-testid={ `${index}-order-number` }>{`Pedido ${item.id}`}</p>
            <p data-testid={ `${index}-order-date` }>{item.sale_date}</p>
            <p data-testid={ `${index}-order-total-value` }>
              {/* {`R$ ${item.totalPrice.replace('.', ',')}`} */}
              {`R$ ${item.total_price}`}
            </p>
          </div>
        ))}
    </div>
  );
}
