import React, { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import { Redirect, useHistory } from 'react-router';
import { getDetailOrders } from '../services/Api/user';
import { updateOrderStatus } from '../services/Api/orders';

const AdminDetailOrder = () => {
  const [products, setProducts] = useState([]);
  const [saleInfo, setSaleInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delivered, setDelivered] = useState(false);
  const { total_price: totalPrice, id, status, sale_date: saleDate } = saleInfo;

  const history = useHistory();
  const path = history.location.pathname;
  const idPathName = path.split('/')[3];
  console.log('parametro', saleInfo);

  const accPrice = (value) => parseFloat(value).toFixed(2).toString().replace('.', ',');

  const finalizeOrder = async () => {
    await updateOrderStatus(id);
    setDelivered(true);
  };

  useEffect(() => {
    const getClientOrders = async () => {
      const {
        data: { productList, saleDetail },
      } = await getDetailOrders(idPathName);
      setProducts(productList);
      setSaleInfo(saleDetail[0]);
      setLoading(false);
    };
    getClientOrders();
  }, [idPathName]);

  if (!localStorage.getItem('token')) {
    return (<Redirect to="/login" />);
  }
  return (
    <div>
      <h1 data-testid="top-title">Detalhes de Pedido</h1>
      {!loading ? (
        <div>
          <h2 data-testid="order-number">{`Pedido  ${id}`}</h2>
          <span data-testid="order-status">{`${!delivered ? status : 'Entregue'}`}</span>
          <h3 data-testid="order-date">{dateFormat(saleDate, 'dd/mm')}</h3>
          {products.map(({ name, key, quantity, price }, index) => (
            <div key={ key }>
              <h5
                data-testid={ `${index}-order-unit-price` }
              >
                { `(R$ ${accPrice(price)})` }
              </h5>
              <h5 data-testid={ `${index}-product-qtd` }>{ quantity }</h5>
              <h5 data-testid={ `${index}-product-name` }>{name}</h5>
              <h5 data-testid={ `${index}-product-total-value` }>
                {
                  `R$ ${accPrice(quantity * price)
                  }`
                }

              </h5>
            </div>
          ))}
          <h3 data-testid="order-total-value">{`Total: R$ ${accPrice(totalPrice)}`}</h3>
          <div>
            <button
              type="button"
              onClick={ () => finalizeOrder() }
              data-testid="mark-as-delivered-btn"
              disabled={ delivered }
            >
              Marcar como entregue
            </button>
          </div>
        </div>
      ) : (
        'deu merda'
      )}
    </div>
  );
};

export default AdminDetailOrder;