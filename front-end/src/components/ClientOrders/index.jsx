import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getUserSalesInfo } from '../../services/apiService';
// import { DivOrder } from './styles';

export default function ClientOrders() {
  const [userSales, setUserSales] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchSales = async () => {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) return null;
      const response = await getUserSalesInfo(currentUser.token)
        .then((apiResponse) => apiResponse);
      console.log(response);
      if (response && Object.values(response).length > 0) {
        setUserSales(response);
      }
    };
    fetchSales();
  }, []);

  if (!userSales) {
    return <p>Loading...</p>
  }

  return (
    <div style={ { display: 'flex', justifyContent: 'center' } }>
      { userSales.err ? <p>{userSales.err.message}</p>
        : userSales.map((item, index) => (
          <div
            type="button"
            data-testid={ `${index}-order-card-container}` }
            key={ item.saleId }
            onClick={ () => history.push(`/orders/${item.saleId}`) }
            role="button"
            onKeyDown={ () => history.push(`/orders/${item.saleId}`) }
            tabIndex={ 0 }
          >
            <p data-testid={ `${index}-order-number` }>{item.saleId}</p>
            <p data-testid={ `${index}-order-date` }>{item.saleDate}</p>
            <p data-testid={ `${index}-order-total-value` }>{item.totalPrice}</p>
          </div>
        ))}
    </div>
  );
}
