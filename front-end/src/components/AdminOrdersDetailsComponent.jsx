import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

function AdminOrdersDetailsComponent({ match }) {
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState('Pendente');
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState({})
  const { params: { id } } = match;
  const { getOrderById, putSales } = useFetch();
  

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const userRecovered = JSON.parse(savedUser); 
    setUser(userRecovered);
    getOrderById(userRecovered.token, id).then((data) => setOrder(data))
    /* estrutura do order
    Order: { sale_id, name, price, quantity, status, sale_date]}
    */
  }, []);

  const handleDelivered = async () => {
    await putSales(user.token, 'Entregue', id);
    setStatus('Entregue')
  }

  useEffect(() => {
    const total = order.reduce((acumulador, product) => {
      const totalPricePerProduct = Number(product.quantity) * Number(product.price);
      return acumulador + totalPricePerProduct;
    }, 0);
    setTotalPrice(total);
  }, [order]);

  return order ? (
    <>
      <header>
        <div>
          <span data-testid="order-number">{`Pedido ${id} -`}</span>
          <span data-testid="order-status">{`${[order].status}`}</span>
          {/* testar como pegar indice 0 */}
        </div>
      </header>
      {order.map((product, index) => (
        <div key={ product.id }>
          <div data-testid={ `${index}-product-qtd` }>{product.quantity}</div>
          <div data-testid={ `${index}-product-name` }>{`${product.name} `}</div>
          <div
            data-testid={ `${index}-product-total-value` }
          >
            {
              `R$ ${(product.quantity * product.price)
                .toFixed(2).toString().replace('.', ',')} `
            }
          </div>
          <div
            data-testid={ `${index}-order-unit-price` }
          >
            {`(R$ ${(product.price * 1).toFixed(2).toString().replace('.', ',')} un) `}
          </div>
        </div>
    ))}
    <div data-testid="order-total-value">
      {`Total: R$ ${totalPrice.toFixed(2).toString().replace('.', ',')}`}
    </div>
      {status === 'Pendente' && <button
        type="button"
        data-testid="mark-as-delivered-btn"
        onClick={ handleDelivered }
      >
        Marcar pedido como entregue
      </button>}
    </>)
    : <span>Loading...</span>
}

export default AdminOrdersDetailsComponent;
