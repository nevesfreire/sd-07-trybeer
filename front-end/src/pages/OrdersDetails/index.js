import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import TopMenu from '../../component/TopMenu';
import { requestGetOrderAPI } from '../../services';
import { getToLocalStorage } from '../../utils/localStorage';

function OrderDetails() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  const validateToken = () => {
    const user = getToLocalStorage('user');
    if (!user || !user.token) return false;
    return true;
  };

  const handleRequestOrder = async () => {
    !validateToken() && history.push('/login');
    const result = await requestGetOrderAPI(id);
    result.status !== StatusCodes.OK ? history.push('/')
      : setProducts(result.data);
  };

  useEffect(() => {
    handleRequestOrder();
  }, [handleRequestOrder]);

  return (
    <>
      <TopMenu title="Detalhes de Pedido" />
      <div>
        <p data-testid="order-number">Pedido</p>
        <p data-testid="order-date">Data</p>
        {products.length && products.map((item) => <DetailsCard key={ item.id } product={ item } />)}
        <p data-testid="order-total-value">Total</p>
      </div>
    </>
  );
}

export default OrderDetails;
