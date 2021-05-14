import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { StatusCodes } from 'http-status-codes';
import BeerAppContext from '../../context/BeerAppContext';
import { requestChangeStatusAPI, requestGetOrderAPI } from '../../services';
import TopMenu from '../../component/TopMenu';
import DetailsCard from '../../component/DetailsCard';
import { getToLocalStorage } from '../../utils/localStorage';

function AdminOrdersDetails() {
  const [products, setProducts] = useState([]);
  const [roleUser, setRoleUser] = useState('');
  const [title, setTitle] = useState('');  
  const { convertPrice } = useContext(BeerAppContext);
  const { id } = useParams();
  const history = useHistory();
  
  const validateToken = () => {    
    const user = getToLocalStorage('user');
    const { role } = user;
    setRoleUser(role);    
    // if (!user || !user.token) return false;
    // return true;
  };

  const handleRequestOrder = async () => {
    validateToken();
    const result = await requestGetOrderAPI(id);
    if (result.status !== StatusCodes.OK) {
      history.push('/');
    } else {
      setProducts(result.data);
      setTitle(result.data[0].status);
    }
  };

  const handleToDelivery = async () => {
    const result = await requestChangeStatusAPI(id);    
    if (result.status === StatusCodes.OK) {
      console.log(result.data.status);
      setTitle(result.data.status);
    }
  }

  useEffect(() => {
    handleRequestOrder();
  }, []);


  return (
    <>
      <TopMenu title={`Admin - Detalhes de Pedido - ${title}` }/>
      <div>
        <p data-testid="order-number">{products.length && `Pedido ${products[0].id}`}</p>
        <p data-testid="order-status">{products.length && `${title}`}</p>
        {products.length
          && products.map((item) => <DetailsCard key={ item.id } product={ item } role = {roleUser} />)}
        <p data-testid="order-total-value">
          {products.length && `Total: ${convertPrice(products[0].total_price)}`}
        </p>
        { title === 'Pendente' &&
          <button
            data-testid="mark-as-delivered-btn"
            type="button"
            onClick={ () => handleToDelivery()}
          >
            Marcar como entregue
          </button>
        }
      </div>
    </>    
  );
}

export default AdminOrdersDetails;
