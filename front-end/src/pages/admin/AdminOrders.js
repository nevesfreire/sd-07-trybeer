import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import SideBarAdmin from '../../components/SideBarAdmin';

function AdminOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/admin/orders')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <SideBarAdmin />

      { isLoading ? <span>Carregando...</span>
        : (
          <div>
            { orders.map((order, index) => (
              <button
                type="button"
                onClick={ () => history.push(`/admin/orders/${order.id}`) }
                key={ order.id }
              >
                <span data-testid={ `${index}-order-number` }>
                  {`Pedido ${order.id}`}
                </span>
                <span data-testid={ `${index}-order-address` }>
                  {`${order.delivery_address}, ${order.delivery_number}`}
                </span>
                <span data-testid={ `${index}-order-total-value` }>
                  {`R$ ${order.total_price.replace('.', ',')}`}
                </span>
                <span data-testid={ `${index}-order-status` }>
                  {order.status}
                </span>
              </button>
            ))}
          </div>)}
    </div>
  );
}

export default AdminOrders;
