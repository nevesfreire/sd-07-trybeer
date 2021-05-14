import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import TopMenu from '../../component/TopMenu';
import { requestGetOrderAPI } from '../../services';
import { getToLocalStorage } from '../../utils/localStorage';
import DetailsCard from '../../component/DetailsCard';
import BeerAppContext from '../../context/BeerAppContext';

function OrderDetails() {
  const [products, setProducts] = useState([]);
  const { convertPrice } = useContext(BeerAppContext);
  const { id } = useParams();
  const history = useHistory();

  const validateToken = () => {
    const user = getToLocalStorage('user');
    if (!user || !user.token) return false;
    return true;
  };

  const handleRequestOrder = async () => {
    if (!validateToken()) history.push('/login');
    const result = await requestGetOrderAPI(id);
    if (result.status !== StatusCodes.OK) {
      history.push('/');
    } else {
      setProducts(result.data);
    }
  };

  const date = () => {
    const dateOrder = products[0].sale_date;
    const dateList = dateOrder.split('T')[0];
    const month = dateList.split('-')[1];
    const day = dateList.split('-')[2];
    return `${day}/${month}`;
  };

  useEffect(() => {
    handleRequestOrder();
  }, []);

  return (
    <>
      <TopMenu title="Detalhes de Pedido" />
      <div>
        <p data-testid="order-number">{products.length && `Pedido ${products[0].id}`}</p>
        <p data-testid="order-date">{products.length && date()}</p>
        {products.length
          && products.map((item) => <DetailsCard key={ item.id } product={ item } />)}
        <p data-testid="order-total-value">
          {products.length && `Total: ${convertPrice(products[0].total_price)}`}
        </p>
      </div>
    </>
  );
}

export default OrderDetails;
