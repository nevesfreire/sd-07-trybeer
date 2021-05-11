import React, { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import { Redirect, useHistory } from 'react-router';
import { getDetailOrders } from '../services/Api/user';

const ClientDetailOrder = () => {
  const [products, setProducts] = useState([]);
  const [saleInfo, setSaleInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const { total_price: totalPrice, id, status, sale_date: saleDate } = saleInfo;

  const history = useHistory();
  const path = history.location.pathname;
  const idPathName = path.split('/')[2];
  console.log('parametro', idPathName);

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
          <h2 data-testid="order-number">{`Pedido  ${id} - ${status}`}</h2>
          <h3 data-testid="order-date">{dateFormat(saleDate, 'dd/mm')}</h3>
          {products.map(({ name, key, quantity, price }, index) => (
            <div key={ key }>
              <h5 data-testid={ `${index}-product-qtd` }>{quantity}</h5>
              <h5 data-testid={ `${index}-product-name` }>{name}</h5>
              <h5 data-testid={ `${index}-product-total-value` }>
                {`R$${
                  quantity * price
                }`}

              </h5>
            </div>
          ))}
          <h3 data-testid="order-total-value">{`Total: R$${totalPrice}`}</h3>
        </div>
      ) : (
        'deu merda'
      )}
    </div>
  );
};

export default ClientDetailOrder;
