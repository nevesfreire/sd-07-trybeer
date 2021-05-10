import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { OrderItemDetails } from '../../components';

function OrderDetails({ match }) {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { id } = match.params;
  console.log(orderDetails);
  const user = JSON.parse(localStorage.getItem('user')) || { name: null, role: null };

  useEffect(() => {
    setIsLoading(true);
    api.getOrderDetailsById(user.token, id).then((response) => {
      if (response.error) {
        setMessage('Nenhum pedido encontrado');
      } else {
        setOrderDetails(response.message);
      }
    });
    setIsLoading(false);
  }, [user.token, id]);

  return (
    <div>
      <h1 data-testid="top-title">Cliente - Detalhes de Pedido</h1>
      <p data-testid="order-number">
        Pedido
        {id}
      </p>
      <p data-testid="order-date">
        Data pedido
        {/* {orderDetails[0].sale_date} */}
      </p>

      {
        isLoading
          ? 'Loading...'
          : orderDetails
            .map((item, index) => (
              <OrderItemDetails
                key={ index }
                orderDetails={ item }
                index={ index }
              />))
      }
      <h2>{ message }</h2>
    </div>
  );
}

export default OrderDetails;
