import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';

function OrderDetails() {
  const { sideIsActive } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState([]);
  // Referência: live lectures esquenta para Trybeer
  const { id } = useParams();
  console.log(id);

  const history = useHistory();
  useEffect(() => {
    const getUser = () => {
      const userStorage = JSON.parse(localStorage.getItem('user'));
      if (!userStorage) return history.push('/login');
    };
    getUser();
  }, [history]);

  useEffect(() => {
    setIsLoading(true);
    const fetchOrders = async () => {
      const response = await fetch(`http://localhost:3001/orders/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const ordersList = await response.json();
      console.log(ordersList);
      setOrder(ordersList);
      setIsLoading(false);
    };
    fetchOrders();
  }, [id]);
  // Referência: requisito 12 feito por Luise
  useEffect(() => {
    const sumProduct = order.reduce((totalItem, actual) => (Number(actual.price)
      * Number(actual.quantity)) + totalItem, 0);
    setTotal(sumProduct);
  }, [order]);
  // Referência:requisito 12 feito por Luise
  return (
    <div>
      <MenuTopMobile />
      <h1 data-testid="top-title">Detalhes de Pedido</h1>
      { isLoading ? <span>Carregando...</span>
        : (
          <div>
            <span data-testid="order-number">
              {`Pedido ${order[0] && order[0].sale_id} - `}
            </span>
            { order.map((product, index) => (
              <div key={ index }>
                <span data-testid={ `${index}-product-qtd` }>
                  {product.quantity}
                </span>
                <span data-testid={ `${index}-product-name` }>
                  {product.name}
                </span>
                <span data-testid={ `${index}-product-total-value` }>
                  {`R$ ${(Number(product.price) * Number(product.quantity))
                    .toFixed(2).replace('.', ',')}`}
                </span>
                <span data-testid={ `${index}-order-unit-price` }>
                  {`(R$ ${Number(product.price).toFixed(2).replace('.', ',')})`}
                </span>
              </div>
            ))}
            <span data-testid="order-total-value">
              {`R$ ${total.toFixed(2).replace('.', ',')}`}
            </span>
          </div>
        )}
      { sideIsActive && <SideBarMobile /> }
    </div>
  );
}

export default OrderDetails;
