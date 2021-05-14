import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderAdmin, OrderCard } from '../components';
import { getOrdersById } from '../api';

import ls from '../services';

function OrdersDetails() {
  const [order, setOrder] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const getUserLogged = useCallback(async () => {
    const { location } = history;
    const dataUser = await ls.acessLocalStorage.getUserLocalStorage();
    if (!dataUser) return history.push('/login');
    const { token } = dataUser;
    const getSalesById = await getOrdersById(token, location.pathname.split('/')[2]);
    setOrder(getSalesById.data);
    if (getSalesById) setIsLoading(false);
  }, [setOrder, history]);

  useEffect(() => {
    getUserLogged();
  }, [getUserLogged]);

  return (
    <div className="first-div">
      <HeaderAdmin title="Detalhes de Pedido" />
      { isLoading || !order || !order.sale
        ? (<p>Carregando...</p>)
        : (
          <>
            <h1
              data-testid="order-number"
            >
              <strong>{`Pedido ${order.sale}`}</strong>
            </h1>
            <h2
              data-testid="order-total-value"
            >
              {`Total: R$ ${order.total_price.split('.').join(',')}`}
            </h2>
            <span
              data-testid="order-date"
            >
              {`${
                order.Date
                  .split('T')[0].split('-')[2]}/${order.Date
                .split('T')[0].split('-')[1]
              }`}
            </span>
            {
              order.products
                .map(
                  (product, index) => (<OrderCard
                    product={ product }
                    key={ index }
                    index={ index }
                  />),
                )
            }
            {console.log('>>>', order)}
          </>
        )}

    </div>
  );
}

export default OrdersDetails;
