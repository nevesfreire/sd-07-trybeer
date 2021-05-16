import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import TopMenu from '../../component/TopMenu';
import { requestGetOrderAPI } from '../../services';
import { getToLocalStorage } from '../../utils/localStorage';
import DetailsCard from '../../component/DetailsCard';
import BeerAppContext from '../../context/BeerAppContext';
import './style.css';

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
    <div className='orders-details-container'>
      <TopMenu title="Detalhes de Pedido" />
      <div className='orders-details-card-container'>
        <div className='order-number'>
          <h1 data-testid="order-number">{products.length && `Pedido ${id}`}</h1>
          <h3 data-testid="order-date">{products.length && date()}</h3>
        </div>
        <div className='details-card'>
          {products.length
            && products.map((item) => <DetailsCard key={ item.id } product={ item } />)}
        </div>
        <h1 data-testid="order-total-value">
          {products.length && `Total: ${convertPrice(products[0].total_price)}`}
        </h1>
      </div>
    </div>
  );
}

export default OrderDetails;
